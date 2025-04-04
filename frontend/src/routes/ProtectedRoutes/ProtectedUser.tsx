import { useEffect, useState } from "react";
import {chekUserApi} from '../../api/user/status-api'
import { Outlet, useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import {setStatus} from '../../../redux_tollkit/slices/logRegSlice/autorisSlice'
import { setOpenRegister } from "../../../redux_tollkit/slices/logRegSlice/loginRegSlice";






export default function ProtectedUser(){
    const [isUser, setUser] = useState<boolean | null>(null)
    const dispatch = useDispatch()
    const navigate  = useNavigate()

    const noAutoris = () => {
        navigate('/')
        dispatch(setOpenRegister())
        return null
    }

    useEffect(() => {
        async function checkAuth() {
            try {
                const authStatus = await chekUserApi();
                setUser(!!authStatus);
                dispatch(setStatus(!!authStatus));
            } catch (error) {
                console.error("Ошибка проверки авторизации", error);
                setUser(false);
            }
        }
        checkAuth();
    }, [dispatch]);

    if (isUser === null) return <div>Загрузка...</div>
    if(isUser === false){
        dispatch(setStatus(false))
    }

    return isUser ?  <Outlet/> : noAutoris()
}