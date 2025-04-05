import { useDispatch } from "react-redux"
import {changePayment} from "@toolkit/slices/makingSlice/makingChekAllValid"
import { useEffect, useState } from "react"
import { setOrderInfo } from "@toolkit/slices/orderSlice"



export default function PaymentForm(){

    const dispatch = useDispatch()
    const [payment, setPayment] = useState<string>('Card')
   
    

    const changePaym = (paymentMethod:string) => {
        dispatch(setOrderInfo({payment:paymentMethod}))
        dispatch(changePayment(paymentMethod))
        setPayment(paymentMethod)
    }

    useEffect(() => {
        dispatch(setOrderInfo({payment:payment}))
    },[])

    return <div className="inputs-basket-info-payment-method-wp">
            <label className="input-payment-method" htmlFor="Card" id="CardLabel"> 
                <input type="radio" name="Payment-method" id="Card"  className="payment-method-radio-custom"  onClick={() => changePaym('Card')} />
                <div  className={`deliviri-method-radio-custom-before ${payment === 'Card' && 'deliviri-method-radio-custom-before-active'}`}>
                    <div className={`deliviri-method-radio-custom-after ${payment === 'Card' && 'deliviri-method-radio-custom-after-active'}`}></div>
                </div>
                <div className="payment-method-text">Оплата картой</div>
            </label>
            <label className="input-payment-method" htmlFor="Cash" id="CashLabel">
                <input type="radio" name="Payment-method" id="Cash"  className="payment-method-radio-custom" onClick={() => changePaym('Cash')} />
                <div  className={`deliviri-method-radio-custom-before ${payment === 'Cash' && 'deliviri-method-radio-custom-before-active'}`}>
                    <div className={`deliviri-method-radio-custom-after ${payment === 'Cash' && 'deliviri-method-radio-custom-after-active'}`}></div>
                </div>
                <div className="payment-method-text">Оплата при получении</div>
            </label>
        </div>
}