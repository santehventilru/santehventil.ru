import { zodResolver } from "@hookform/resolvers/zod"
import { formatPhoneNumber } from "@shared/utils/valid"
import { setAddressStep } from "@toolkit/slices/makingSlice/makingAdressFrom"
import { setUserStep, setUserValid } from "@toolkit/slices/makingSlice/makingFormControllSlice"
import { setOrderInfo } from "@toolkit/slices/orderSlice"
import { RootState } from "@toolkit/store/store"
import React, { useEffect } from "react"

import {  SubmitHandler, useForm } from "react-hook-form"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { z } from "zod"

// interface userFormInterface{
//     schema: sche
// }
interface UserDataInterFace{
    first_name:string
    last_name:string
    phone:string
    email:string

    [key: string]: string;
}

type Props = {
    schema: z.ZodType<UserDataInterFace>
    userData?: Partial<UserDataInterFace>
  }


const  UserForm = ({ schema, userData = {} }: Props) => {



    const dispatch = useDispatch()
    const { addressValid, userStep } = useSelector(
        (state: RootState) => ({
          addressValid: state.makkingAdressForm.addressValid,
          userStep: state.makingFormControllSlice.userStep
        }),
        shallowEqual
      );

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
            dispatch(setOrderInfo(data as UserDataInterFace))
            dispatch(setUserStep(false))
            dispatch(setUserValid(true))
            if(!addressValid){
                dispatch(setAddressStep(true))
            }
            
    }

    const filter = new Set(['first_name', 'last_name', 'email', 'phone'])
    type UserFormKeys = 'first_name' | 'last_name' | 'email' | 'phone'

    useEffect(() => {
    if (Object.keys(userData).length > 0) {
        Object.keys(userData).forEach((key) => {
        if (filter.has(key)) {
            setValue(
            key as UserFormKeys,
            userData[key as UserFormKeys] ?? '',
            { shouldValidate: true }
            )
        }
        })
    }
    }, [userData])
    
    
    return (
        <>

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
        </>
    )
}

export default React.memo(UserForm)