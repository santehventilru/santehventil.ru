import { useEffect, useState } from "react";
import { 
    formatPhoneNumber, 
    stringInputValidation, 

    stringInputValidationMail, 
    stringInputValidationNumber 
} from "@shared/utils/valid";
import {toast} from 'react-toastify'
import { useChangeInfoMutation, useGetUserInfoQuery } from "@reduxApi/userApi";



export interface UserInfo {
    first_name?: string;
    last_name?: string;
    login?: string;
    email?: string;
    phone?: string;
    address?:string,
    id?:number
}

interface Errors {
    first_name?: string;
    last_name?: string;
    login?: string;
    email?: string;
    phone?: string;
}



export default function PersInfoForm() {
    const [phone, setPhone] = useState<string>('');
    const [first_name, setName] = useState<string>('');
    const [last_name, setLastName] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [errors, setErrors] = useState<Errors>({});
    const [id, setId] = useState<number>()

    // const dispatch = useDispatch<AppDispatch>()
    const {data = [], isSuccess, } = useGetUserInfoQuery('user')
    const [changeInfo, {
        isSuccess: changeSuccess,
        isError:changError 
    }] = useChangeInfoMutation()


    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setter(event.target.value);
        };
    
    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(formatPhoneNumber(event.target.value));
    };

    const validateForm = (): boolean => {
        const newErrors: Errors = {};
        
        if (!stringInputValidation(first_name)) newErrors.first_name = "Некорректное имя";
        if (!stringInputValidation(last_name)) newErrors.last_name = "Некорректная фамилия";
        if (!stringInputValidationMail(email)) newErrors.email = "Некорректный email";
        if (!stringInputValidationNumber(phone)) newErrors.phone = "Некорректный номер телефона";
        // if (!stringInputValidationLogin(login)) newErrors.login = "Некорректный логин";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const updateInfo = () => {
        if (validateForm()) {
            const data = {
                phone,
                first_name,
                last_name,
                login,
                email,
                id
            }

        const update =  async () => {
            try {
                await changeInfo(data)
                
            } catch (error) {
                    toast.warning('Проблема отправки, обратитесь в поддержку')
            }
        }
        update()
        }
    };

    useEffect(() => {
        if(changeSuccess){
            toast.success('Данные обновлены')
        }if(changError){
            toast.error('Ошибка обновления данных')
        }
    },[changeSuccess, changError])

    useEffect(() => {
        if (isSuccess) {
            setPhone(data[0].phone || '');
            setName(data[0].first_name || '');
            setLastName(data[0].last_name || '');
            setLogin(data[0].login || '');
            setEmail(data[0].email || '');
            setId(Number(data[0].id));
        }
    }, [isSuccess, data]);

    return (
        <div className="pers-info-item">
            <div className="pers-info-form-wp">
                <div className="ferst-pers-info-wp">
                    <div className="input-pers-info-wp">
                        <p className="inuput-pers-info-name bg-inuput-pers-info-name">Имя</p>
                        <input 
                            type="text" 
                            value={first_name} 
                            onChange={handleChange(setName)} 
                            placeholder="Введите ваше имя"
                            className="input-entry-pers-info" 
                        />
                        {errors.first_name && <span className="error-message"  style={{background:' linear-gradient(180deg, #FF214F 23.18%, #99142F 100%)', backgroundClip:'text'}}>{errors.first_name}</span>}
                    </div>
                    <div className="input-pers-info-wp">
                        <p className="inuput-pers-info-name bg-inuput-pers-info-name">Фамилия</p>
                        <input 
                            type="text" 
                            value={last_name} 
                            onChange={handleChange(setLastName)} 
                            placeholder="Введите вашу фамилию" 
                            className="input-entry-pers-info"
                        />
                        {errors.last_name && <span className="error-message" 
                         style={{background:' linear-gradient(180deg, #FF214F 23.18%, #99142F 100%)', backgroundClip:'text'}}>
                        {errors.last_name}</span>}

              </div>
                    <div className="input-pers-info-wp">
                        <p className="inuput-pers-info-name bg-inuput-pers-info-name">Логин</p>
                        <input 
                            type="text" 
                            value={login} 
                            onChange={handleChange(setLogin)} 
                            placeholder="Введите логин" 
                            className="input-entry-pers-info"
                        />
                        {errors.login && <span className="error-message"  style={{background:' linear-gradient(180deg, #FF214F 23.18%, #99142F 100%)', backgroundClip:'text'}}>{errors.login}</span>}
                    </div>
                </div>
                <div className="second-pers-info-wp">
                    <div className="input-pers-info-wp">
                        <p className="inuput-pers-info-name bg-inuput-pers-info-name">Почта</p>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={handleChange(setEmail)} 
                            placeholder="Введите почту"
                            className="input-entry-pers-info" 
                        />
                        {errors.email && <span className="error-message"  style={{background:' linear-gradient(180deg, #FF214F 23.18%, #99142F 100%)', backgroundClip:'text'}}>{errors.email}</span>}
                    </div>
                    <div className="input-pers-info-wp">
                        <p className="inuput-pers-info-name bg-inuput-pers-info-name">Номер телефона</p>
                        <input 
                            type="tel" 
                            value={phone} 
                            onChange={handlePhoneChange} 
                            placeholder="+7 (___) ___-__-__" 
                            className="input-entry-pers-info"
                        />
                        {errors.phone && <span className="error-message"  style={{background:' linear-gradient(180deg, #FF214F 23.18%, #99142F 100%)', backgroundClip:'text'}}>{errors.phone}</span>}
                    </div>
                </div>
            </div>
            <button className="button button-pers-info--save" onClick={updateInfo}>Сохранить</button>
        </div>
    );
}
