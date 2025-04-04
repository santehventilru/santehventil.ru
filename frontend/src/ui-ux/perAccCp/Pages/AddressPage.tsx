import { useCallback, useEffect, useRef, useState } from "react";
import { postAutoSelectPlaceApi } from "../../../api/externalApi";
import { Address } from "../../MakingOrderCp/MakingForm/AddresAndDeliv";
import { toast } from "react-toastify";
import { useChangeInfoMutation, useGetUserInfoQuery } from "@reduxApi/userApi";


export default function AddressPage(){

    const [address, setAddress1] = useState<string>('')
    const [profileID , setID ]  = useState()
    const input  = useRef<HTMLInputElement | null>(null)
    const [adressArr, setAddress] = useState([])
    const [focus, setFocus] = useState(false)

    const {data = [], isSuccess, } = useGetUserInfoQuery('user')
    const [changeInfo, {
            isSuccess: changeSuccess,
            isError:changError 
    }] = useChangeInfoMutation()

    const getAdressApi = async (value:string) => {
        try {
            const result  = await postAutoSelectPlaceApi(value)
            if(!result){
                console.log('Ошибка')
            }else{
                setAddress(result.suggestions)
            }
            
        } catch (error) {
            console.error(error)
        }
    }
    

    const changeValue = (newValue:string) => {
       
        if(input.current){
            input.current.value = newValue
            setAddress1(newValue)
        } 
    }

    const handeFocus = () => {
        setFocus(true)
     }
     const handelBlur  = () => {
         setTimeout(() => {setFocus(false)}, 500)
     }
     
    const sumbitAddress  = useCallback(async () => {
        const data = {
            address:address,
            id:profileID
        }
        console.log(data)
        try {
            await changeInfo(data)
        } catch (err) {
            console.error('Ошибка', err)
        }
    },[address])

    useEffect(() => {
        if(isSuccess){
            setAddress1(data[0].address || '')
            setID(data[0].id)
        }
    },[isSuccess,data])

    useEffect(() => {
        if(changeSuccess){
            toast.success('Данные обновлены')
        }if(changError){
            toast.error('Ошибка обновления данных')
        }
    },[changeSuccess, changError])

    const onChange  = () => {
        const value  = input.current?.value
        if(value){
            setAddress1(value)
            getAdressApi(value)
        }else{
            setAddress1('')
        }
    }

    return <>
    <div className="adress-category-wp persAcc-data-active">

                <div className="adress-category-content-wp">
                    <div className="adress-category-item">
                        <h3 className="heading-text-pers-info">Персональная информация</h3>
                        <div className="adress-category-form-wp">
                            <div className="ferst-adress-category-wp">
                                <div className="input-adress-category-wp ">
                                    <p className="inuput-pers-info-name ">Адресс</p>
                                    <input type="text" name="AddressPersInfo" onBlur={handelBlur} onFocus={handeFocus} onChange={onChange} ref={input} value={address || ''} id="AddressPersInfo" className="input-entry-pers-info" autoComplete="street-address" placeholder="Введите адресс доставки" required  minLength={4} />
                                    <div 
                                    className={` ${!focus ?  'suggestion-none' : 'suggsetion_wp'}`} 
                                    >
                                            { focus && adressArr && adressArr.length > 0 && adressArr.map((val: Address) => 
                                                <div className="suggestionItem" key={val.value} onClick={() => changeValue(val.value)}>
                                                    {val.value}
                                                </div>
                                            )}
                                        </div>
                                </div>
                                <button className="button button-adress-category" onClick={sumbitAddress}>Сохранить</button>
                            </div>
                            <div className="adress-categor-text-wp">
                                Данный адресс будет автоматически указываться при офромлении заказа, при необходимости его можно поменять
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </>
        
}