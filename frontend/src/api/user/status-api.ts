import axios from "axios";


export const chekUserApi = async () => {
    try {
        const res  =  await axios.get('/api/auth/chek/user' , { withCredentials: true })
        return res.data
    } catch (error) {
        console.error("Ошибка проверки пользователя:", error);
        return null;
    }

}

export const chekAdminApi = async () => {
    try {
        const res  =  await axios.get('/api/auth/chek/admin' , { withCredentials: true })
        return res.data
    } catch (error) {
        console.error("Ошибка проверки пользователя:", error);
        return null;
    }

}