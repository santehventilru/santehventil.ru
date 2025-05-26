import { useSelector } from "react-redux"

import {motion} from 'framer-motion'
import { useEffect} from "react"

import {

    stringInputValidation, 
    stringInputValidationMail, 
    stringInputValidationNumber 
} from '../../../shared/utils/valid'

import {z} from 'zod'

import { RootState } from "@toolkit/store/store"
import { useLazyGetUserInfoQuery } from "@reduxApi/userApi"
import PageLoading from "@shared/components/PageLoading"
import ErrorMessage from "@shared/ui/ErrorMessage"
import UserForm from "./UserForm"
import UserBack from "./UserBack"

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


export default function UserInfoForm(){

    const [fetchUser, {data, isError,  isSuccess, isLoading}] = useLazyGetUserInfoQuery()
    const autorisStatus = useSelector((state:RootState) => state.autoriseSlice.autorisStatus)


   
    useEffect(() => {
        autorisStatus && fetchUser('user')
   
    }, [autorisStatus]);

    return <motion.div className="MakingOrder-stages-wp" id="RecipientDetails">
        {autorisStatus && isLoading && <PageLoading/>}
        {autorisStatus && isError && <ErrorMessage/>}

    
                
        <div className="MakingOrder-heading-status-wp">
            <h2 className="MakingOrder-heading-text">Данные получателя</h2>
                <UserBack/>
            </div>
        <UserForm schema={schema} userData={isSuccess && data?.[0] || {}} />
                

    
</motion.div>
}