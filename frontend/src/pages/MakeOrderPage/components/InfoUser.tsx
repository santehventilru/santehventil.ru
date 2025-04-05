import { useDispatch, useSelector } from "react-redux"
import {setUserStep, setUserValid} from '@toolkit/slices/makingSlice/makingFormControllSlice'
import {motion} from 'framer-motion'
import { useEffect} from "react"
import {setAddressStep} from '@toolkit/slices/makingSlice/makingAdressFrom'
import {
    formatPhoneNumber, 
    stringInputValidation, 
    stringInputValidationMail, 
    stringInputValidationNumber 
} from '../../../shared/utils/valid'
import {useForm , SubmitHandler}  from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import { setOrderInfo } from "@toolkit/slices/orderSlice"
import { RootState } from "@toolkit/store/store"
import { useLazyGetUserInfoQuery } from "@reduxApi/userApi"




export default function UserInfoForm(){

    const dispatch = useDispatch()
    const [fetchUser, {data:userData, isSuccess:userSuc, isLoading:userLoading}] = useLazyGetUserInfoQuery()
    // const heigthOfFrom  = useRef<HTMLFormElement| null>(null)


    const userStep = useSelector((state:RootState) => state.makingFormControllSlice.userStep)
    const userValid = useSelector((state:RootState) => state.makingFormControllSlice.userValid)
    const addressValid = useSelector((state:RootState) => state.makkingAdressForm.addressValid)
    const autorisStatus = useSelector((state:RootState) => state.autoriseSlice.autorisStatus)

    // const userInfo = useSelector((state: any) => {
    //     const userInfo = state.autoriseSlice.userInfo;
    //     return Array.isArray(userInfo) ? userInfo : JSON.parse(userInfo);
    // });

    // const userInfoObject = userInfo
    // ? userInfo.reduce(
    //     (acc: { [key: string]: string }, { key, value }: { key: string; value: string }) => {
    //       acc[key] = value;
    //       return acc;
    //     },
    //     {}
    //   )
    // : {};

    

    const schema  = z.object({
        first_name:z.string(),
        last_name:z.string(),
        email:z.string(),
        phone:z.string(),

    }).superRefine((data, ctx) => { 
        if(!stringInputValidation(data.first_name)){
            ctx.addIssue({
                code:'custom',
                message:"Поле не должно содеражть цифр ",
                path:['first_name']
            })
        }
        if(!stringInputValidation(data.last_name)){
            ctx.addIssue({
                code:'custom',
                message:"Поле не должно содеражть цифр ",
                path:['last_name']
            })
        }
        if(!stringInputValidationNumber(data.phone)){
            ctx.addIssue({
                code:'custom',
                message:"Неверный формат номера",
                path:['phone']
            })
        }
        if(!stringInputValidationMail(data.email)){
            ctx.addIssue({
                code:'custom',
                message:"Неверный формат почты",
                path:['email']
            })
        }
    })

    const {register, handleSubmit, formState:{errors},  setValue} = useForm<z.infer<typeof schema>>({
        resolver:zodResolver(schema),
        defaultValues: {
            first_name: '',
            last_name: '',
            phone: '',
            email: ''
        }
    })
    

    const maskNumber  = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue('phone' , formatPhoneNumber(event.target.value));
    }
    const handelNext:SubmitHandler<z.infer<typeof schema>> = (data) => {
        dispatch(setOrderInfo(data))
        dispatch(setUserStep(false))
        dispatch(setUserValid(true))
        if(!addressValid){
            dispatch(setAddressStep(true))
        }
        
    }

    const handelPrev = () => {
        dispatch(setUserStep(true))
        dispatch(setUserValid(false))
    }

    const filter = new Set(['first_name', 'last_name', 'email', 'phone'])
    useEffect(() => {

        if(autorisStatus && !userLoading ){
            fetchUser('user').then((res) => {
                if(res && userSuc){
                    Object.keys(userData[0]).forEach(key => {
                        if(filter.has(key)){

                            setValue(key as 'first_name' | 'last_name' | 'email' | 'phone', userData[0][key] ?? '', { shouldValidate: true })
                        }
                    })
                }
            }).catch((err) => {
                console.error(err)
            })
        }    
    }, [autorisStatus, userLoading ]);

    // console.log(autorisStatus)


   


    return <motion.div className="MakingOrder-stages-wp" id="RecipientDetails">

    <div className="MakingOrder-heading-status-wp">
        <h2 className="MakingOrder-heading-text">Данные получателя</h2>

        {userValid && <div className="MakingOrder-status-wp" onClick={handelPrev}>
            <p className="status-text" id="RecipientDetailsChange">изменить</p>
            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" className="status-text-svg">
                <path d="M12.7104 2.64592C13.6737 1.82501 14.1553 1.41457 14.6589 1.17388C15.8237 0.61717 17.1777 0.61717 18.3424 1.17388C18.846 1.41457 19.3276 1.82501 20.291 2.64592C20.6743 2.97264 20.866 3.13601 21.0708 3.27322C21.5401 3.58777 22.0671 3.80608 22.6213 3.9155C22.8632 3.96325 23.1141 3.98329 23.6164 4.02335C24.878 4.12402 25.5087 4.17436 26.0351 4.36025C27.2522 4.7902 28.2098 5.74764 28.6397 6.96488C28.8256 7.49116 28.8758 8.12196 28.9766 9.38357C29.0166 9.8857 29.0366 10.1368 29.0844 10.3786C29.1938 10.9328 29.4121 11.4599 29.7268 11.9292C29.8639 12.1339 30.0273 12.3256 30.3541 12.709C31.1749 13.6722 31.5854 14.154 31.8261 14.6574C32.3827 15.8222 32.3827 17.1762 31.8261 18.3409C31.5854 18.8446 31.1749 19.3261 30.3541 20.2895C30.0273 20.6728 29.8639 20.8645 29.7268 21.0693C29.4121 21.5386 29.1938 22.0656 29.0844 22.62C29.0366 22.8617 29.0166 23.1128 28.9766 23.6149C28.8758 24.8765 28.8256 25.5072 28.6397 26.0336C28.2098 27.2508 27.2522 28.2083 26.0351 28.6383C25.5087 28.8241 24.878 28.8744 23.6164 28.9751C23.1141 29.0151 22.8632 29.0353 22.6213 29.0829C22.0671 29.1924 21.5401 29.4106 21.0708 29.7253C20.866 29.8625 20.6743 30.0258 20.291 30.3526C19.3276 31.1734 18.846 31.5839 18.3424 31.8246C17.1777 32.3812 15.8237 32.3812 14.6589 31.8246C14.1553 31.5839 13.6737 31.1734 12.7104 30.3526C12.3271 30.0258 12.1354 29.8625 11.9306 29.7253C11.4613 29.4106 10.9343 29.1924 10.38 29.0829C10.1382 29.0353 9.88717 29.0151 9.38504 28.9751C8.12343 28.8744 7.49261 28.8241 6.96634 28.6383C5.74911 28.2083 4.79165 27.2508 4.36172 26.0336C4.17583 25.5072 4.12549 24.8765 4.02482 23.6149C3.98474 23.1128 3.96472 22.8617 3.91697 22.62C3.80755 22.0656 3.58924 21.5386 3.27469 21.0693C3.13747 20.8645 2.97411 20.6728 2.64739 20.2895C1.82648 19.3261 1.41604 18.8446 1.17533 18.3409C0.618639 17.1762 0.618639 15.8222 1.17533 14.6574C1.41604 14.1538 1.82648 13.6722 2.64739 12.709C2.97411 12.3256 3.13747 12.1339 3.27469 11.9292C3.58924 11.4599 3.80755 10.9328 3.91697 10.3786C3.96472 10.1368 3.98474 9.8857 4.02482 9.38357C4.12549 8.12196 4.17583 7.49116 4.36172 6.96488C4.79165 5.74764 5.74911 4.7902 6.96634 4.36025C7.49261 4.17436 8.12343 4.12402 9.38504 4.02335C9.88717 3.98329 10.1382 3.96325 10.38 3.9155C10.9343 3.80608 11.4613 3.58777 11.9306 3.27322C12.1354 3.13601 12.3271 2.97264 12.7104 2.64592Z" stroke="#7880B5" stroke-width="1.5"/>
                <path d="M10.5234 17.354L13.9401 20.7707L22.4818 12.229" stroke="#7880B5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>     
        </div>}
    </div>
    
    {userStep && <>
        <form className="inputs-makingOrder-main-container" onSubmit={handleSubmit(handelNext)} >
        <div className="input-MakingOrder-wp">
            <p className="inuput-MakingOrder-name bg-inuput-pers-info-name">Имя</p>
            <input {...register('first_name')} type="text"  className="input-entry-MakingOrder-info" id="inputName" placeholder="Введите ваше имя" required  minLength={4}/>
            {errors.first_name && (
              <p className="error-message">{errors.first_name.message}</p>
            )}
        </div>

        <div className="input-MakingOrder-wp">
            <p className="inuput-MakingOrder-name bg-inuput-pers-info-name">Фамилия</p>
            <input {...register('last_name')}  type="text"  className="input-entry-MakingOrder-info" id="inputSurname" placeholder="Введите вашу фамилию" required  minLength={4}/>
            {errors.last_name && (
              <p className="error-message">{errors.last_name.message}</p>
            )}
        </div>

        <div className="input-MakingOrder-wp">
            <p className="inuput-MakingOrder-name bg-inuput-pers-info-name">Почта</p>
            <input {...register('email')} type="email"   className="input-entry-MakingOrder-info" id="inputMail" placeholder="Введите ваш email" required  minLength={4}/>
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
        </div>

        <div className="input-MakingOrder-wp">
            <p className="inuput-MakingOrder-name bg-inuput-pers-info-name">Телефон</p>
            <input {...register('phone')}  type="tel"  onChange={maskNumber} className="input-entry-MakingOrder-info" id="inputTel" placeholder="Введите ваш номер телефона" required  minLength={4}/>
            {errors.phone && (
              <p className="error-message">{errors.phone.message}</p>
            )}
        </div>

        <div className="input-MakingOrder-wp">
            <p className="inuput-MakingOrder-name ">Комментарий к заказу</p>    
            <textarea className="comment-makorder-wp"  name="Comment" id="inputComment">

            </textarea>
        </div>
    

        <div className="button-makorder-wp">
            <button  type="submit" className="button button-makorder" id="RecipientDetailButton" >далее</button>
        </div>
    </form>
    </>}
    
</motion.div>
}