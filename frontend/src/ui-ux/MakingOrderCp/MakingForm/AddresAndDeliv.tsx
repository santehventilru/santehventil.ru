import { useDispatch, useSelector } from "react-redux"
import {setAddressStep, setAddressValid, changeDelivery} from '../../../../redux_tollkit/slices/makingSlice/makingAdressFrom'
import {setProductStep} from '../../../../redux_tollkit/slices/makingSlice/makingProductForm'
import { useEffect, useRef, useState } from "react"
import { postAutoSelectPlaceApi } from "../../../api/externalApi"
// import { AddressSuggestions, DaDataAddress, DaDataSuggestion } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
// import {useForm, SubmitHandler, get} from 'react-hook-form'
// import {zodResolver} from '@hookform/resolvers/zod'
// import {z} from 'zod'
// import { RootOptions } from "react-dom/client"
import { AppDispatch, RootState } from "../../../../redux_tollkit/store/store"
import {addressValid} from '../../../validatoins/valid'
import { setOrderInfo } from "../../../../redux_tollkit/slices/orderSlice"
import { useLazyGetUserInfoQuery } from "@reduxApi/userApi"

const addresValidation  = addressValid

export interface Address {
    value: string;
}

export default function AddressAndDeliveryForm(){


    const [deliv,setDeliv] = useState<string>('Courier')
    const [status, setStatus] = useState<string>('wait-order')
    const [address, setAddressValue] = useState<string>('')
    const [adressArr, setAddress] = useState([])
    const [focus, setFocus] = useState(false)
    const [fetchUser, {data:userData, isSuccess:userSuc, isLoading:userLoading}] = useLazyGetUserInfoQuery()
    const [hidden, setHidden] = useState<boolean>(true)

    const dispatch = useDispatch<AppDispatch>()

    const addressStep =  useSelector((state:any) => state.makkingAdressForm.addressStep) 
    const addressValid = useSelector((state:any) => state.makkingAdressForm.addressValid)
    const productValid = useSelector((state:any) => state.makkingProductForm.productValid)
    const addressInput  = useRef<HTMLInputElement | null>(null)
    const autorisStatus  = useSelector((state:RootState) => state.autoriseSlice.autorisStatus)
    // const delivMet = useSelector((state:any) => state.makkingAdressForm.deliveryMethod)
    // const userInfo  = useSelector((state:RootState) => state.autoriseSlice.userInfo).reduce<{ [key: string]: string }>((acc, item: UserInfo) => {
    //     acc[item.key] = item.value;
    //     return acc;
    // }, {})['address']
    

    const handelNext = () => {
        if(deliv === 'SelfCall'){
            dispatch(setOrderInfo({delivery_address:address, delivery_type:deliv, status}))
            dispatch(setAddressStep(false))
            dispatch(setAddressValid(true))
            if(!productValid){
                dispatch(setProductStep(true))
            }
        }
        else if(addresValidation(address)){
            dispatch(setOrderInfo({delivery_address:address, delivery_type:deliv, status}))
            dispatch(setAddressStep(false))
            dispatch(setAddressValid(true))
            if(!productValid){
                dispatch(setProductStep(true))
            }
        }
            
            
    }


        

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
        if(addressInput.current){
            addressInput.current.value = newValue
            setAddressValue(newValue)
            
        } 
    }

    const handleChange = () => {
        const value  = addressInput.current?.value
        
        if(value){
            setAddressValue(value  || '')
            getAdressApi(value.toLowerCase())
        }else{
            setAddressValue('');
        }
       
    }
    const handeFocus = () => {
       setFocus(true)
    }
    const handelBlur  = () => {
        setTimeout(() => {setFocus(false)}, 500)
    }
    const changeDeliv = (deliv:string) => {
        if(deliv === "SelfCall"){
            dispatch(changeDelivery(deliv))
            dispatch(changeDelivery({status:'order-create'}))
            setStatus('order-create')
        }else{
            dispatch(changeDelivery(deliv))
            dispatch(changeDelivery({status:'wait-order'}))
            setStatus('wait-order')
        }
        setDeliv(deliv)
        console.log(deliv)
        
        deliv === 'SelfCall' ? setHidden(false) : setHidden(true)
    }
    
    const deactiveStatus = () => {
            dispatch(setAddressStep(true))
            dispatch(setAddressValid(false))
    }
    

    useEffect(() => {
        if(autorisStatus && !userLoading ){
            fetchUser('user').then((res) => {
                if(res && userSuc){
                    setAddressValue(userData[0]['address'] || '')
                }
            }).catch((err) => {
                console.error(err)
            })
        }
       
    },[autorisStatus, userLoading])

    

    return <div className="MakingOrder-stages-wp " id="PlaceAndMethod">
                <img className="background-MakingOrder-stages" src="img/decor-making-order.webp" alt=""/>
                <img className="background-MakingOrder-stages-center" src="img/delivir-center-img.webp" alt=""/>
                <img className="background-MakingOrder-stages-bottom" src="img/diliviri-bottom-img.webp" alt=""/>
                
                <div className="MakingOrder-heading-status-wp">
                    <h2 className="MakingOrder-heading-text">Место и способ доставки</h2>
                    {
                        addressValid && <div className="MakingOrder-status-wp " onClick={deactiveStatus}>
                        <p className="status-text" id="PlaceAndMethodChange">изменить</p>
                        <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg"  className="status-text-svg">
                            <path d="M12.7104 2.64592C13.6737
                             1.82501 14.1553 1.41457 14.6589 1.17388C15.8237 0.61717
                              17.1777 0.61717 18.3424 1.17388C18.846 1.41457 19.3276 1.82501 20.291 2.64592C20.6743 2.97264 20.866 3.13601 21.0708 3.27322C21.5401 3.58777 22.0671 3.80608 22.6213 3.9155C22.8632 3.96325 23.1141 3.98329 23.6164 4.02335C24.878 4.12402 25.5087 4.17436 26.0351 4.36025C27.2522 4.7902 28.2098 5.74764 28.6397 6.96488C28.8256 7.49116 28.8758 8.12196 28.9766 
                              9.38357C29.0166 9.8857 29.0366 10.1368 29.0844 10.3786C29.1938 10.9328 29.4121 11.4599 29.7268 11.9292C29.8639 12.1339 30.0273 12.3256 30.3541 12.709C31.1749 13.6722 31.5854 14.154 31.8261 14.6574C32.3827 15.8222 32.3827 17.1762 31.8261 18.3409C31.5854 18.8446 31.1749 19.3261 30.3541 20.2895C30.0273 20.6728 29.8639 20.8645 29.7268 21.0693C29.4121 21.5386 29.1938 22.0656 29.0844 22.62C29.0366 22.8617 29.0166 23.1128 28.9766 23.6149C28.8758 24.8765 28.8256 25.5072 28.6397 26.0336C28.2098 27.2508 27.2522 28.2083 26.0351 28.6383C25.5087
                               28.8241 24.878 28.8744 23.6164 28.9751C23.1141 29.0151 22.8632 29.0353 22.6213 
                              29.0829C22.0671 29.1924 21.5401 29.4106 21.0708 29.7253C20.866 29.8625 20.6743 30.0258 20.291 30.3526C19.3276 31.1734 18.846 31.5839 18.3424 31.8246C17.1777 32.3812 15.8237 32.3812 14.6589 31.8246C14.1553 31.5839 13.6737 31.1734 12.7104 30.3526C12.3271 30.0258 12.1354 29.8625 11.9306 29.7253C11.4613 29.4106 10.9343 29.1924 10.38 29.0829C10.1382 29.0353 9.88717 29.0151 9.38504 28.9751C8.12343 28.8744 7.49261 28.8241 6.96634 28.6383C5.74911 28.2083
                               4.79165 27.2508 4.36172 26.0336C4.17583 25.5072 4.12549 24.8765 4.02482 23.6149C3.98474 23.1128 3.96472 22.8617 3.91697 22.62C3.80755 22.0656 3.58924 21.5386 3.27469 21.0693C3.13747 20.8645 2.97411 20.6728 2.64739 20.2895C1.82648 19.3261 1.41604 18.8446 1.17533 18.3409C0.618639 17.1762 0.618639 15.8222 1.17533 14.6574C1.41604 14.1538 1.82648 13.6722 2.64739 12.709C2.97411 12.3256 3.13747 12.1339 3.27469 11.9292C3.58924 11.4599 3.80755 10.9328 3.91697 10.3786C3.96472 10.1368 3.98474 9.8857 
                              4.02482 9.38357C4.12549 8.12196 4.17583 7.49116 4.36172 6.96488C4.79165 5.74764 5.74911 4.7902 6.96634 4.36025C7.49261 4.17436 8.12343 4.12402 9.38504 4.02335C9.88717 3.98329 10.1382 3.96325 10.38 3.9155C10.9343 3.80608 11.4613 3.58777 11.9306 3.27322C12.1354 3.13601 12.3271 2.97264 12.7104 2.64592Z"
                             stroke="#7880B5" stroke-width="1.5"/>
                            <path d="M10.5234 17.354L13.9401 20.7707L22.4818 12.229" stroke="#7880B5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>     
                    </div>
                    }
                </div>
                

                {addressStep && <>
                
                     
                    <div className="inputs-makingOrder-main-container">
                        {hidden && 
                    <div className="input-MakingOrder-wp">
                        <p className="inuput-MakingOrder-name bg-inuput-pers-info-name">Введите место доставки</p>
                        <input type="text" name="Name" id="inputAdress" value={address || ''} ref={addressInput} onFocus={handeFocus} onBlur={handelBlur} onChange={handleChange} className="input-entry-PlaceAndMethod-info" placeholder="Введите город, улицу, дом, квартиру" required  minLength={4}/>
                        <div 
                        className={` ${!focus?  'suggestion-none' : 'suggsetion_wp'}`} 
                        >
                            { focus && adressArr && adressArr.length > 0 && adressArr.map((val: Address) => 
                                <div className="suggestionItem" key={val.value} onClick={() => changeValue(val.value)}>
                                    {val.value}
                                </div>
                            )}
                        </div>
                        
                    </div>
                    }
                    <div className="input-MakingOrder-wp">
                        <p className="inuput-MakingOrder-name">Выберите способ доставки</p>
                        
                        <div className="inputs-basket-info-delivir-method-wp" tabIndex={0} >
                            <label className="input-deliviri-method" htmlFor="Courier" id="CourierLabel"> 
                                <input type="radio" name="deliver-method" id="Courier"  onClick={() => changeDeliv('Courier')} className="payment-method-radio-custom"  />
                                <div  className={`deliviri-method-radio-custom-before ${deliv === 'Courier' && 'deliviri-method-radio-custom-before-active'}`}>
                                    <div className={`deliviri-method-radio-custom-after ${deliv === 'Courier' && 'deliviri-method-radio-custom-after-active'}`}></div>
                                </div>
                                <div className="deliviri-method-text">Курьерская доставка</div>
                            </label>
                            <label className="input-deliviri-method" htmlFor="SelfCall" id="SelfCallLabel">
                                <input type="radio" name="deliver-method" id="SelfCall" onClick={() => changeDeliv('SelfCall')} className="payment-method-radio-custom"/>
                                <div className={`deliviri-method-radio-custom-before ${deliv === 'SelfCall' && 'deliviri-method-radio-custom-before-active'}`}>
                                <div className={`deliviri-method-radio-custom-after ${deliv === 'SelfCall' && 'deliviri-method-radio-custom-after-active'}`}></div>
                                </div>
                                <div className="deliviri-method-text">Самовызов в москве</div>
                            </label>
                            <label className="input-deliviri-method" htmlFor="TransferLine" id="TransferLineLabel">
                                <input type="radio" name="deliver-method" id="TransferLine" onClick={() => changeDeliv('TransferLine')} className="payment-method-radio-custom"/>
                                <div className={`deliviri-method-radio-custom-before ${deliv === 'TransferLine' && 'deliviri-method-radio-custom-before-active'}`}>
                                <div className={`deliviri-method-radio-custom-after ${deliv === 'TransferLine' && 'deliviri-method-radio-custom-after-active'}`}></div>
                                </div>
                                <div className="deliviri-method-text">Доставка до транспартной линии</div>
                            </label>
                            <label className="input-deliviri-method" htmlFor="Express" id="ExpressDeliv">
                                <input type="radio" name="deliver-method" id="Express" onClick={() => changeDeliv('Express')} className="payment-method-radio-custom"/>
                                <div className={`deliviri-method-radio-custom-before ${deliv === 'Express' && 'deliviri-method-radio-custom-before-active'}`}>
                                <div className={`deliviri-method-radio-custom-after ${deliv === 'Express' && 'deliviri-method-radio-custom-after-active'}`}></div>
                                </div>
                                <div className="deliviri-method-text">Эксперсс доставка</div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* <AddressSuggestions  token="86a2819cf3e94ef7db7bcfa7f78a4ae023697af7" value={value} onChange={setValue}/> */}
    
    


                <div className="button-makorder-wp">
                    <button className="button button-makorder" id="PlaceAndMethodButton" onClick={handelNext}>далее</button>
                </div>
                
                </>}

            </div>
}