const bcrypt = require('bcryptjs');
const pool = require('../config/db');

class ProfileController {
    async register(req, res) {
        try {
            // Вспомогательная функция для генерации уникального логина
            const generateRandomLogin = () => {
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let login = '';
                for (let i = 0; i < 8; i++) {
                    const randomIndex = Math.floor(Math.random() * characters.length);
                    login += characters[randomIndex];
                }
                return login;
            };
    
            // Вспомогательная функция для проверки уникальности логина
            const isLoginTaken = async (login) => {
                const result = await pool.query('SELECT * FROM profile WHERE login = $1', [login]);
                return result.rows.length > 0;
            };
    
            // Деструктуризация данных из тела запроса
            const { 
                login,  
                password, 
                email, 
                first_name = 'FirstName', 
                last_name = 'LastName', 
                city = '', 
                address = 'Москва', 
                phone = 'не указан' 
            } = req.body;
    
            // Если логин не передан, генерируем уникальный
            let uniqueLogin = login || generateRandomLogin();
    
            // Проверяем уникальность логина, если он был передан
            if (login && await isLoginTaken(login)) {
                return res.status(400).json({ field: 'login', message: 'Этот логин уже занят' });
            }
    
            // Если логин не был передан, генерируем уникальный и проверяем его
            if (!login) {
                while (await isLoginTaken(uniqueLogin)) {
                    uniqueLogin = generateRandomLogin();
                }
            }
    
            // Проверка на уникальность email
            const existingEmail = await pool.query('SELECT * FROM profile WHERE email = $1', [email]);
            if (existingEmail.rows.length > 0) {
                return res.status(400).json({ field: 'email', message: 'Этот email уже используется' });
            }
    
            // Хешируем пароль
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Добавляем пользователя в базу данных
            const newProfile = await pool.query(
                'INSERT INTO profile (login, first_name, last_name, password, city, address, phone, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
                [uniqueLogin, first_name, last_name, hashedPassword, city, address, phone, email]
            );
    
            // Запоминаем пользователя в сессии
            req.session.userId = newProfile.rows[0].id;
    
            // Отправляем ответ
            res.status(201).json(newProfile.rows[0]);
        } catch (err) {
            // Обработка ошибок
            if (err.code === '23505') { // Ошибка уникальности ключа в PostgreSQL
                if (err.detail.includes('profile_login_key')) {
                    return res.status(400).json({ field: 'login', message: 'Этот логин уже занят' });
                }
                if (err.detail.includes('profile_email_key')) {
                    return res.status(400).json({ field: 'email', message: 'Этот email уже используется' });
                }
            }
    
            // Внутренняя ошибка сервера
            res.status(500).json({ message: 'Внутренняя ошибка сервера', error: err.message });
        }
    }
    
    
    

    async login(req, res) {
        try {
            const { loginoremail, password } = req.body;
            const profile = await pool.query('SELECT * FROM profile WHERE login = $1 or email = $1', [loginoremail]);
            if (profile.rows.length === 0) {
                return res.status(400).json({ error: 'Invalid login or password' });
            }

            const validPassword = await bcrypt.compare(password, profile.rows[0].password);
            if (!validPassword) {
                return res.status(400).json({ error: 'Invalid login or password2' });
            }

            req.session.userId = profile.rows[0].id;
            req.session.role= profile.rows[0].role;
            
             res.json({ message: 'Login successful' , user : {role : req.session.role} }) ; 
        } catch (err) {
            res.status(500).json({ error: err.message });
        } 
    };

    // async updateProfile(req, res) {
    //     try {
    //         const { login, first_name, last_name, password, city, address, phone, email } = req.body;

    //         const hashedPassword = await bcrypt.hash(password, 10);

    //         const updatedProfile = await pool.query(
    //             'UPDATE profile SET first_name = $2, last_name = $3, password = $4, city = $5, address = $6, phone = $7, email = $8 WHERE login = $1 RETURNING *',
    //             [login, first_name, last_name, hashedPassword, city, address, phone, email]
    //         );

    //         if (updatedProfile.rows.length > 0) {
    //             res.json(updatedProfile.rows[0]);
    //         } else {
    //             res.status(404).json({ error: 'Profile not found' });
    //         }
    //     } catch (err) {
    //         res.status(500).json({ error: err.message });
    //     }
    // };

    logout(req, res) {
        req.session.destroy((err) => {
            if (err) return res.status(500).json({ error: 'Logout failed' });
            res.json({ message: 'Logout successful' });
        });
    }

    async getAllProfiles(req, res) {
        try {
            const result = await pool.query('SELECT * FROM profile');
            res.json(result.rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };

    async getProfileByIRender(req, res) {
        try {
            const id = req.session.userId;
            const profile = await pool.query('SELECT * FROM profile WHERE id = $1', [id]);

            if (profile.rows.length > 0) {
                res.render('profile', { title: 'TowelWarmer', profile: profile.rows[0] }); 
            } else {
                res.status(404).json({ error: 'Profile not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };
    async getProfileById(req, res) {
        try {
            const id = req.session.userId;
            const profile = await pool.query('SELECT * FROM profile WHERE id = $1', [id]);
            // console.log('Profile query result:', profile.rows);
            if (profile.rows.length > 0) {
                res.json(profile.rows);
                 
            } else {
                res.status(404).json({ error: 'Profile not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };

    async getProfileByName(req, res) {
        try {
            const { first_name, last_name } = req.params;
            const profile = await pool.query(
                'SELECT * FROM profile WHERE first_name ILIKE $1 AND last_name ILIKE $2',
                [`%${first_name}%`, `%${last_name}%`]
            );

            if (profile.rows.length > 0) {
                res.json(profile.rows[0]);
            } else {
                res.status(404).json({ error: 'Profile not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };

    async deleteProfile(req, res) {
        try {
            const { login } = req.params;
            const deleteResult = await pool.query('DELETE FROM profile WHERE login = $1 RETURNING *', [login]);

            if (deleteResult.rows.length > 0) {
                res.json({ message: 'Profile deleted successfully' });
            } else {
                res.status(404).json({ error: 'Profile not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };
    async updateProfile(req, res) {
        try {
            const { id, first_name, login,  last_name, password, city, address, phone, email } = req.body;
    
            // Создаем массив для обновлений и массив для значений
            const updates = [];
            const values = [];
    
            // Увеличиваем индекс на 1 для установки значений
            let index = 1;
    
            // Проверяем, какие поля были переданы и добавляем их в запрос
            if (first_name) {
                updates.push(`first_name = $${index++}`);
                values.push(first_name);
            }
            if (login) {
                updates.push(`login = $${index++}`);
                values.push(login);
            }
            if (last_name) {
                updates.push(`last_name = $${index++}`);
                values.push(last_name);
            }
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                updates.push(`password = $${index++}`);
                values.push(hashedPassword);
            }
            if (city) {
                updates.push(`city = $${index++}`);
                values.push(city);
            }
            if (address) {
                updates.push(`address = $${index++}`);
                values.push(address);
            }
            if (phone) {
                updates.push(`phone = $${index++}`);
                values.push(phone);
            }
            if (email) {
                updates.push(`email = $${index++}`);
                values.push(email);
            }
    
            // Если нет данных для обновления, можем вернуть ошибку
            if (updates.length === 0) {
                return res.status(400).json({ error: 'No fields to update' });
            }
    
            // Формируем SQL-запрос
            const query = `UPDATE profile SET ${updates.join(', ')} WHERE id = $${index} RETURNING *`;
            values.push(id); // добавляем login в значения
    
            const updatedProfile = await pool.query(query, values);
    
            if (updatedProfile.rows.length > 0) {
                res.json(updatedProfile.rows[0]);
            } else {
                res.status(404).json({ error: 'Profile not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async сonfrimOldPas(req, res) {
        try {
            const { id, password } = req.body;
            const profile = await pool.query('SELECT * FROM profile WHERE id= $1', [id]);
            
            const validPassword = await bcrypt.compare(password, profile.rows[0].password);
            if (!validPassword) {
                return res.status(400).json({ error: 'Invalid login or password2' });
            }


             res.json({ message: 'ok' }) ; 
        } catch (err) {
            res.status(500).json({ error: err.message });
        } 
    };

    async changePassword(req, res){
        try {
            const {id, old_pass, new_pass} = req.body;
            const profile = await pool.query('select * from profile where id = $1', [id])
            const chekVAlid  = await bcrypt.compare(old_pass, profile.rows[0].password)

            if(!chekVAlid){
                return res.status(400).json({ error: 'Неверный пароль' });
            }
            const hashedPassword =  await bcrypt.hash(new_pass, 10)

            const update_pas = await pool.query('update profile set password = $1 where id = $2 returning * ', [hashedPassword, id])

            if(update_pas.rowCount === 0 ){
                return res.status(400).json({ error: 'Ошибка обновления пароля' });;
            }

            
        } catch (err) {
            res.status(500).json({error:err.message})
        }
    }
    async allUser(req, res) {
        try {
            // Только администраторы могут видеть всех пользователей
            if (req.session.role !== 'admin') {
                return res.status(403).json({ error: 'Access denied' });
            }

            const result = await pool.query('SELECT * FROM profile');
            res.json(result.rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async deleteUserById(req, res) {
        try {
            const { id } = req.params;
    
            // Проверяем, существует ли пользователь с данным id
            const profile = await pool.query('SELECT * FROM profile WHERE id = $1', [id]);
            if (profile.rows.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
    
            // Удаляем пользователя из базы данных
            const deleteResult = await pool.query('DELETE FROM profile WHERE id = $1 RETURNING *', [id]);
    
            if (deleteResult.rows.length > 0) {
                res.json({ message: 'User deleted successfully' });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    
    // Метод для смены пароля пользователя по id
    async changeUserPasswordById(req, res) {
        try {
            const { id, new_pass } = req.body;
    
            // Проверяем, существует ли пользователь с данным id
            const profile = await pool.query('SELECT * FROM profile WHERE id = $1', [id]);
            if (profile.rows.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
    
            // Хешируем новый пароль
            const hashedPassword = await bcrypt.hash(new_pass, 10);
    
            // Обновляем пароль в базе данных
            const updatedProfile = await pool.query('UPDATE profile SET password = $1 WHERE id = $2 RETURNING *', [hashedPassword, id]);
    
            if (updatedProfile.rows.length > 0) {
                res.json({ message: 'Password updated successfully' });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    

   
}

module.exports = new ProfileController();
