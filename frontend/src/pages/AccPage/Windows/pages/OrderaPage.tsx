import { useEffect, useState } from "react";
import { useGetUserInfoQuery, useLazyGetUserOrderQuery } from "@reduxApi/userApi";
import OrderData from "./components/OrderData";





export default function OrdersPage(){

    const {data = [], isSuccess, } = useGetUserInfoQuery('user')
    const [fetchOrderUser, {data:orderData, isSuccess:orderSuccess, isLoading:orderLoading, isError:orderError}] = useLazyGetUserOrderQuery()

    useEffect(() => {
        if(isSuccess){
            fetchOrderUser(`my/orders/${data[0].id}`)  
        }
    },[isSuccess, data])


    if(orderError) return <div>Ошибка загрузки закакзов</div>
    if(orderLoading) return <div>Заказы загружаются</div>
    if(orderSuccess) return  <OrderData orderData={orderData} orderDataString={JSON.stringify(orderData)} />
}