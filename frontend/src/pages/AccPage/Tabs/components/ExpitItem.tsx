import { useEffect, useState } from "react"
import { logoutApi } from "@api/user/profile-api"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@toolkit/store/store"
import { setStatus, setUserInfo } from "@toolkit/slices/logRegSlice/autorisSlice"
// import { setAutoris, setRole, unsetUserInfo } from "../../../../redux_tollkit/slices/logRegSlice/autorisSlice"



export default function ExitItem(){

    const [isAvtive, setActive] = useState<boolean>(false)
    const navigate  = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const handeCLick = () => {
        setActive(!isAvtive)
    }

    const logout = async () => {
        try {
            const result  = await logoutApi()
            if(result){
                dispatch(setStatus(false))
                dispatch(setUserInfo({}))
                navigate('/')
            }
        } catch (error) {
            
        }
    }
    useEffect(() =>{
        if(isAvtive){
            logout()    
        }
    },[isAvtive])



    return  <li className="categor-item exit-btn-acc-wp" onClick={handeCLick}>
                <div className="categor-item-cont button-resacc-exit-wp"> 
                    <img className="svg-acc-exit" src="" alt="" />  
                    <a ><div className="categor-text categor-text-active-exit" id="ButtonExPrivOf">Выход</div></a>
                </div>
            </li>
}