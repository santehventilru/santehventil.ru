import { useState } from "react";
import OrderMoreInfo from "./OrderMoreInfo";
import OrderWay from "./OrderWay";
import { orderInterFace, OrderMoreInfoInterface } from "../type";



export default function OrderItem({
    status,  
    order_date, 
    order_id,
    delivery_address,
    delivery_type,
    items,
    payment,
    total_price,
    delivery_price,

}:orderInterFace){

    const [toggle, setToggle] = useState<boolean>(true)


    const orderMoreInfo :  OrderMoreInfoInterface = {
        items,
        payment,
        total_price,
        delivery_type,
        delivery_address,
        delivery_price,
    }

    const heandelOpen = () => {
        setToggle(!toggle)
    }

    return <>
    
        <div className="order-way">
            <p className="order-number">Заказ №{order_id}</p>
            <p className="order-date">Дата прибытия {order_date.split('T')[0].split('-').reverse().join('.')}</p>
            <button onClick={heandelOpen} className="order-details-definite" id='${order.order_id}'>{toggle ? `Детали заказа` : 'Закрыть'}</button>
        </div>
        {toggle ? <OrderWay totalPrice={total_price} delivery_price={delivery_price || 0} status={status}/> : <OrderMoreInfo  {...orderMoreInfo}/>}
        
        <div className="order-line"></div>
</>
} 