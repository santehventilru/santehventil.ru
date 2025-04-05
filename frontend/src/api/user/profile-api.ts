import axios  from "axios";
import { UserInfo } from "../../pages/AccPage/Windows/pages/components/PersInfoForm";


export const loginApi = async ({loginoremail, password}:{loginoremail: string, password:string}) => {
    try {
        const res  = await axios.post('/api/login', {
            loginoremail,
            password
        },{
            headers:{
                'Content-Type': 'application/json'
            }
        })
        return res.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Ошибка авторизации:", error.response?.data?.error || "Неизвестная ошибка");
            // return { error: error.response?.data?.error || "Ошибка сети" };
            return false
        }
        // return { error: "Неизвестная ошибка" };
        return false
    }
}


type ApiResponse<T = any> =
    | { success: true; data: T }
    | { success: false; error: { message: string } };

export async function registerApi(data: { email: string; password: string }) : Promise<ApiResponse> {
    try {
        const response = await axios.post('/api/reg', data);
        return { success: true, data: response.data };
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return {
                success: false,
                error: typeof error.response.data === 'string'
                    ? { message: error.response.data } // Если сервер прислал просто строку
                    : error.response.data?.message
                        ? { message: error.response.data.message } // Если сервер прислал объект с message
                        : { message: 'Неизвестная ошибка' } // Если вообще ничего не понятно
            };
        
        }
        return { success: false, error: { message: 'Ошибка сети или сервера' } };
    }
}

export const logoutApi = async () => {
    try {
       const res  = await axios.post('/api/logout', {

       })
       return res.data
    } catch (error) {
        console.error("Ошибка", error);
        return null;
    }
}


export const getUserInfo  = async () => {
    try {
        const res  = await axios.get('/api/my')
        return res.data
    } catch (error) {
        console.error("Ошибка получения данных:", error);
        return null;
    }
}

export const getOrdersList  = async (profile_id:number) => {
    try {
        const res  = await axios.get(`/api/my/orders/${profile_id}`)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.error("Ошибка получения сипка заказков:", error);
        return null;
    }
}

export const putUserInfoApi = async (data :UserInfo) => {
    try {
        const res = await axios.put(`/api/user/:login`, data);
        return res.data; 
    } catch (error) {
        console.error('Ошибка при обновлении информации о пользователе:', error);
        return false
    }
}


export const changePasswordApi = async ({id, currentPassword,newPassword}:{id:number,currentPassword:string, newPassword:string}) => {
    try {
        const res  = await axios.post('/api/change_password',{
            id,
            old_pass:currentPassword,
            new_pass:newPassword
        },{
            headers:{
                'Content-Type':'application/json'
            }
        })
        return res.data
    } catch (error) {
        console.error('Ошибка при обновлении пароля', error);
        return false
    }
}

export const createOrderApi = async ({delivery_type, delivery_address, phone, payment, status}:{delivery_type:string, status:string, delivery_address:string, phone:string, payment:string}) => {
    try {
        const res  = await axios.post('/api/order/confirm',{
            delivery_type,
            delivery_address,
            phone,
            payment,
            status

        })
        return res.data
    } catch (error) {
        
    }
}


