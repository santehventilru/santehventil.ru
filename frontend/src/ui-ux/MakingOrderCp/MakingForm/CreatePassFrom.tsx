import {motion} from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { setPasswordStep, setPasswordValid } from "../../../../redux_tollkit/slices/makingSlice/makingPasswordFrom"
import {SubmitHandler, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import { passwordValid } from "../../../validatoins/valid"
import { setOrderInfo } from "../../../../redux_tollkit/slices/orderSlice"

// console.log(passwordValid)
const schema  = z.object({
    password:z.string().min(8, 'Минимум 8 символов'),
    passConfrim:z.string().min(8, 'Минимум 8 символов')
})
.superRefine((data, ctx) => {
    if(!passwordValid(data.password)){
        ctx.addIssue({
            code:'custom',
            message:'Пароль должен сожердать цифры и спецсимволы',
            path:['password']
        })
    }
    if(data.password !== data.passConfrim){
        ctx.addIssue({
            code:'custom',
            message:'Пароли не совпадают',
            path:['passConfrim']
        })
    }
    
})

export default function CreatePassForm(){

    

    

    const {register, handleSubmit, formState:{errors}} = useForm<z.infer<typeof schema>>({resolver:zodResolver(schema)})


    const dispatch = useDispatch()

    const passwordStep = useSelector((state:any) => state.makkingPasswordForm.passwordStep)
    const passwordValid = useSelector((state:any) => state.makkingPasswordForm.passwordValid)

    const handelNext :SubmitHandler<z.infer<typeof schema>> = (data) =>{
        dispatch(setPasswordStep(false))
        dispatch(setPasswordValid(true))
        dispatch(setOrderInfo({password:data.password}))
    }
    const handelPrev = () =>{
        dispatch(setPasswordStep(true))
        dispatch(setPasswordValid(false))
    }



    return <motion.div className="MakingOrder-stages-wp" id="RecipientDetails"
    
    animate={{ opacity: 1 }}
    // transition={{duration:0.3}}
    
    >
    {/* <img className="background-MakingOrder-stages" src="img/decor-making-order.webp" alt=""/> */}
    <div className="MakingOrder-heading-status-wp">
        <h2 className="MakingOrder-heading-text">Создание пароля</h2>

        {passwordValid && <div className="MakingOrder-status-wp" onClick={handelPrev}>
            <p className="status-text" id="RecipientDetailsChange">изменить</p>
            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" className="status-text-svg">
                <path d="M12.7104 2.64592C13.6737 1.82501 14.1553 1.41457 14.6589 1.17388C15.8237 0.61717 17.1777 0.61717 18.3424 1.17388C18.846 1.41457 19.3276 1.82501 20.291 2.64592C20.6743 2.97264 20.866 3.13601 21.0708 3.27322C21.5401 3.58777 22.0671 3.80608 22.6213 3.9155C22.8632 3.96325 23.1141 3.98329 23.6164 4.02335C24.878 4.12402 25.5087 4.17436 26.0351 4.36025C27.2522 4.7902 28.2098 5.74764 28.6397 6.96488C28.8256 7.49116 28.8758 8.12196 28.9766 9.38357C29.0166 9.8857 29.0366 10.1368 29.0844 10.3786C29.1938 10.9328 29.4121 11.4599 29.7268 11.9292C29.8639 12.1339 30.0273 12.3256 30.3541 12.709C31.1749 13.6722 31.5854 14.154 31.8261 14.6574C32.3827 15.8222 32.3827 17.1762 31.8261 18.3409C31.5854 18.8446 31.1749 19.3261 30.3541 20.2895C30.0273 20.6728 29.8639 20.8645 29.7268 21.0693C29.4121 21.5386 29.1938 22.0656 29.0844 22.62C29.0366 22.8617 29.0166 23.1128 28.9766 23.6149C28.8758 24.8765 28.8256 25.5072 28.6397 26.0336C28.2098 27.2508 27.2522 28.2083 26.0351 28.6383C25.5087 28.8241 24.878 28.8744 23.6164 28.9751C23.1141 29.0151 22.8632 29.0353 22.6213 29.0829C22.0671 29.1924 21.5401 29.4106 21.0708 29.7253C20.866 29.8625 20.6743 30.0258 20.291 30.3526C19.3276 31.1734 18.846 31.5839 18.3424 31.8246C17.1777 32.3812 15.8237 32.3812 14.6589 31.8246C14.1553 31.5839 13.6737 31.1734 12.7104 30.3526C12.3271 30.0258 12.1354 29.8625 11.9306 29.7253C11.4613 29.4106 10.9343 29.1924 10.38 29.0829C10.1382 29.0353 9.88717 29.0151 9.38504 28.9751C8.12343 28.8744 7.49261 28.8241 6.96634 28.6383C5.74911 28.2083 4.79165 27.2508 4.36172 26.0336C4.17583 25.5072 4.12549 24.8765 4.02482 23.6149C3.98474 23.1128 3.96472 22.8617 3.91697 22.62C3.80755 22.0656 3.58924 21.5386 3.27469 21.0693C3.13747 20.8645 2.97411 20.6728 2.64739 20.2895C1.82648 19.3261 1.41604 18.8446 1.17533 18.3409C0.618639 17.1762 0.618639 15.8222 1.17533 14.6574C1.41604 14.1538 1.82648 13.6722 2.64739 12.709C2.97411 12.3256 3.13747 12.1339 3.27469 11.9292C3.58924 11.4599 3.80755 10.9328 3.91697 10.3786C3.96472 10.1368 3.98474 9.8857 4.02482 9.38357C4.12549 8.12196 4.17583 7.49116 4.36172 6.96488C4.79165 5.74764 5.74911 4.7902 6.96634 4.36025C7.49261 4.17436 8.12343 4.12402 9.38504 4.02335C9.88717 3.98329 10.1382 3.96325 10.38 3.9155C10.9343 3.80608 11.4613 3.58777 11.9306 3.27322C12.1354 3.13601 12.3271 2.97264 12.7104 2.64592Z" stroke="#7880B5" stroke-width="1.5"/>
                <path d="M10.5234 17.354L13.9401 20.7707L22.4818 12.229" stroke="#7880B5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>     
        </div>}
    </div>
    
     {passwordStep &&   <>
        
        <form className="inputs-makingOrder-main-container" onSubmit={handleSubmit(handelNext)}>
            <div className="input-MakingOrder-wp">
                <p className="inuput-MakingOrder-name bg-inuput-pers-info-name">Придумайте пароль</p>
                <input type="password" {...register('password')}   className="input-entry-MakingOrder-info" id="inputName" placeholder="password" required  />
                {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
            </div>

            <div className="input-MakingOrder-wp">
                <p className="inuput-MakingOrder-name bg-inuput-pers-info-name">Повторите пароль</p>
                <input type="password" {...register('passConfrim')}  className="input-entry-MakingOrder-info" id="inputSurname" placeholder="confrim password" required />
                {errors.passConfrim && (
              <p className="error-message">{errors.passConfrim.message}</p>
            )}
            </div>

            <div>
            После оформленния заказа бдует создан личный профиль, в котором вы можете отследить статус заказа.<br/>
            Для входа используйте <svg  style={{width:12, padding:'0px 5px'}} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 10C14 12.2091 12.2091 14 10 14C7.79086 14 6 12.2091 6 10C6 7.79086 7.79086 6 10 6C12.2091 6 14 7.79086 14 10ZM14 10V11.5C14 12.8807 15.1193 14 16.5 14C17.8807 14 19 12.8807 19 11.5V10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19H14" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>почту и <svg style={{width:12, padding:'0px 5px'}}  viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 12.5V14.5M4 8.0288C4.47142 8 5.05259 8 5.8 8H12.2C12.9474 8 13.5286 8 14 8.0288M4 8.0288C3.41168 8.0647 2.99429 8.1455 2.63803 8.327C2.07354 8.6146 1.6146 9.0735 1.32698 9.638C1 10.2798 1 11.1198 1 12.8V14.2C1 15.8802 1 16.7202 1.32698 17.362C1.6146 17.9265 2.07354 18.3854 2.63803 18.673C3.27976 19 4.11984 19 5.8 19H12.2C13.8802 19 14.7202 19 15.362 18.673C15.9265 18.3854 16.3854 17.9265 16.673 17.362C17 16.7202 17 15.8802 17 14.2V12.8C17 11.1198 17 10.2798 16.673 9.638C16.3854 9.0735 15.9265 8.6146 15.362 8.327C15.0057 8.1455 14.5883 8.0647 14 8.0288M4 8.0288V6C4 3.23858 6.23858 1 9 1C11.7614 1 14 3.23858 14 6V8.0288" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>пароль.
        </div>

        <div className="button-makorder-wp">
            <button className="button button-makorder" id="RecipientDetailButton" type="submit">далее</button>
        </div>
        </form>


        

     </> }
    

    
</motion.div>
}
