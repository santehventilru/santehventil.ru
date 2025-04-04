import { useDispatch } from "react-redux"
import {setOpenRegister, setCloseModals} from '../../../redux_tollkit/slices/logRegSlice/loginRegSlice'
// import {setAutoris, setRole} from '../../../redux_tollkit/slices/logRegSlice/autorisSlice'
// import {motion , AnimatePresence} from "framer-motion"
import { useState } from "react"
import {loginApi} from '../../api/user/profile-api'
import {useNavigate} from 'react-router-dom'
import {AnimatePresence ,  motion } from "framer-motion"



export default function LoginWindow(){

    const [formData, setFormData] = useState({
        loginoremail:'',
        password:'',
    })
    const [active , setActive] = useState<string | boolean>(false)
    const [error, setError]  = useState<boolean>(false)

    const dispatch = useDispatch()
    const navigate  = useNavigate()
    
    const handelCLickRegister = () => {
        dispatch(setOpenRegister())
    }

    const heandelClickClose = () => {
        dispatch(setCloseModals())
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handelFocus = (item:string | boolean) => {
        
        setActive(item)
        if(error){
            setError(false)
        }
    }
    

    const handelSumbit = async () => {
        
        try {
            const result  = await loginApi(formData)
            if(result){
                if(result.user.role === 'admin'){
                    navigate('/admin')
                }else{
                    navigate('/user')
                }
                // dispatch(setAutoris(true))
                // dispatch(setRole(result.user.role))
                dispatch(setCloseModals())
            }else{
                setError(true)
            }
        } catch (error) {
            
        }
    } 

    return <div className="wraper-modal-entry">

                        <button className="button-modal--exit" onClick={heandelClickClose}>
                            <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.170067 0.170067C0.396823 -0.056689 0.764467 -0.056689 0.991223 0.170067L6 5.17884L11.0088 0.170067C11.2355 -0.056689 11.6032 -0.056689 11.8299 0.170067C12.0567 0.396823 12.0567 0.764467 11.8299 0.991223L6.82116 6L11.8299 11.0088C12.0567 11.2355 12.0567 11.6032 11.8299 11.8299C11.6032 12.0567 11.2355 12.0567 11.0088 11.8299L6 6.82116L0.991223 11.8299C0.764467 12.0567 0.396823 12.0567 0.170067 11.8299C-0.056689 11.6032 -0.056689 11.2355 0.170067 11.0088L5.17884 6L0.170067 0.991223C-0.056689 0.764467 -0.056689 0.396823 0.170067 0.170067Z" fill="#7880B5"/>
                            </svg>  
                        </button>

                        <div className="auto-select">
                            <h2 style={{width:'100%'}}><a className="text modal-text-entry-main" >Вход</a></h2>
                            
                            <h2 style={{width:'100%'}}><a className="text modal-text-regist" id="RegisterRef" onClick={handelCLickRegister}>Регистрация</a></h2>
                        </div>
                            <p className="form-entry-label">Введите логин и пароль.</p>
                            <AnimatePresence>
                                {error && 
                                    <motion.span
                                    initial={{y:-10, opacity:0}}
                                    animate={{y:0, opacity:1}}
                                    exit={{x:-10, opacity:0}}
                                    transition={{duration:0.3}}
                                    style={{
                                        background:' linear-gradient(180deg, #FF214F 23.18%, #99142F 100%)', 
                                        backgroundClip:'text',
                                        fontSize:14
                                    }}
                                    >
                                        Неверный логин или пароль
                                    </motion.span>
                                }
                            </AnimatePresence>
                        <form className="form-entry">
                                <label className="relative" htmlFor="Login">
                                    <svg  className ={`svg-login-group ${active === 'loginoremail' && 'focus-svg-header'}`}  viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11 11C12.6569 11 14 9.65685 14 8C14 6.34315 12.6569 5 11 5C9.34315 5 8 6.34315 8 8C8 9.65685 9.34315 11 11 11Z" stroke="white" stroke-width="1.5"/>
                                        <path d="M16.9696 19C16.8105 16.1085 15.9252 14 11.0004 14C6.0757 14 5.1904 16.1085 5.03125 19" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                                        <path d="M6 2.33782C7.47087 1.48697 9.1786 1 11 1C16.5228 1 21 5.47715 21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 9.1786 1.48697 7.47087 2.33782 6" stroke="#F6D863" stroke-width="1.5" stroke-linecap="round"/>
                                    </svg>
                                        
                                    <input onBlur={() => handelFocus(false)} onFocus={() => handelFocus('loginoremail')} type="text" name="loginoremail" id="Login" className="input-entry-login no-color-input" value={formData.loginoremail} placeholder="Login or Email" required  minLength={4} onChange={handleChange}/>
                                </label>

                                <label className="relative" htmlFor="Password">
                                    <svg className ={`svg-login-group ${active === 'password' && 'focus-svg-header'}`} viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 12.5V14.5M4 8.0288C4.47142 8 5.05259 8 5.8 8H12.2C12.9474 8 13.5286 8 14 8.0288M4 8.0288C3.41168 8.0647 2.99429 8.1455 2.63803 8.327C2.07354 8.6146 1.6146 9.0735 1.32698 9.638C1 10.2798 1 11.1198 1 12.8V14.2C1 15.8802 1 16.7202 1.32698 17.362C1.6146 17.9265 2.07354 18.3854 2.63803 18.673C3.27976 19 4.11984 19 5.8 19H12.2C13.8802 19 14.7202 19 15.362 18.673C15.9265 18.3854 16.3854 17.9265 16.673 17.362C17 16.7202 17 15.8802 17 14.2V12.8C17 11.1198 17 10.2798 16.673 9.638C16.3854 9.0735 15.9265 8.6146 15.362 8.327C15.0057 8.1455 14.5883 8.0647 14 8.0288M4 8.0288V6C4 3.23858 6.23858 1 9 1C11.7614 1 14 3.23858 14 6V8.0288" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                        
                                    <input type="password" name="password" id="Password" onBlur={() => handelFocus(false)} onFocus={() => handelFocus('password')} className="input-entry-password no-color-input" value={formData.password} placeholder="Password" required  minLength={4} onChange={handleChange}/>
                                </label>
                            
                                <a   id="ButtonEntrance"  className="button button-entry center" onClick={handelSumbit}>    
                                    Вход
                                </a>
                                
                                
                        </form>
                        <div className="alt-register">
                            <span className="text-register-whit">
                                Or register with
                            </span>
                        </div>

                        <div className="alt-continue">
                            <button type="button" className="  googl-continue-button"> f</button>
                            <button type="button" className="  fs-continue-button"> f</button>
                        </div>
                 </div>
}