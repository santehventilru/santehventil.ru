import { useEffect, useState } from "react";
import { useGetUserInfoQuery, useGetUserOrderQuery } from "@reduxApi/userApi";
import { orderInterFace } from "./type";
import OrderItem from "./components/OrderItem";





export default function OrdersPage(){


    const [orders , setOrders] = useState<orderInterFace[] | null>(null)
    const [noOrders, setNoOrders] = useState<boolean>(false)
    const [profileID , setID ]  = useState()
    const {data = [], isSuccess, } = useGetUserInfoQuery('user')
    const {data:orderData = [], isSuccess:orderSuccess} = useGetUserOrderQuery(`my/orders/${profileID}` ,{
        skip:!profileID
    })
    
    useEffect(() => {
        if(orderSuccess){
            if(orderData.length > 0){
                setOrders([...orderData])
                setNoOrders(false)
            }else{
                setNoOrders(true)
            }  
        } 
    },[orderSuccess, data, orderData])

    useEffect(() => {
        if(isSuccess){
            setID(data[0].id)
        }
    },[isSuccess, data])




    return  <div className="оrders-category-wp persAcc-data-active">
    <div className="flex flex-top">
        <h2 className="heading-text-pers-info">Ваши заказы</h2>
        <div className="btn-flex">
            <button className="text btn-text order-info-close order-info-close-none">Актуальные заказы</button>
            <button className="text btn-text btn-text-end">Доставленные заказы</button>
        </div>
        
    </div>
    
  
    <div className="order-item-wp">
        {orders && orders.map(order => <OrderItem key={order.order_id} {...order}/>)}
        {noOrders && <div>Нет заказов</div>}
    </div>
</div>
}