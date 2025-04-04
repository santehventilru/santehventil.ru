import {  useLazyGetUserOrderQuery } from "@reduxApi/userApi"
import { useEffect, useState } from "react"
import { orderInterFace } from "../../types/interface"
import AdminOrderCardMain from "./AdiminOrderCardMain"
import { toast } from "react-toastify"
import AdminOrderMainInfo from "./AdminOrderMainInfo"
import TumblerFilter from "./TubmlerFilter"


const statusFilters = [
    { name: 'wait-order', text: 'Обработка заказа' },
    { name: 'for-payment', text: 'К оплате' },
    { name: 'order-create', text: 'Заказ создан' },
    { name: 'order-post', text: 'Передается в доставку' },
    { name: 'in-way', text: 'В пути' },
    { name: 'order-close', text: 'Доставлен' }
];

const statusPayment = [
    {
        name:'1',
        text:'Оплачено'
    },
    {
        name:'0',
        text:'Не оплачено',
    },
]

interface filterOrders{
    status:string[],
    payment:string[]
}
type FilterMethod = "status" | "payment";







export default function AdminOrderMain(){
    const [orders, setOrders] = useState<orderInterFace[]>([])
    const [isOrder, setIsOrder] = useState<string>('')
    const [isOrderInfo, setIsOrderInfo] = useState<orderInterFace>()
    const [tumblerActive, setTumberActive] = useState<filterOrders>({status:[],payment:[]})
    const [fetchOrder, {data:allOrders, isSuccess:orderSuccess, isLoading:orderLoading}] = useLazyGetUserOrderQuery()

    const orderOpen  = (orderID:number, orderInfo:orderInterFace) => {
        if(orderID){
            const stringID = String(orderID)
            setIsOrder(stringID)
            setIsOrderInfo({...orderInfo})
        }else{
            toast.error('Ошибка получени ID заказ')
        }
    }



    const togletumbler = (name:string, method:FilterMethod) => {
        const newTumblers = {...tumblerActive}
        if(tumblerActive[method].length > 0 && tumblerActive[method].includes(name)){ 
           newTumblers[method] = newTumblers[method].filter(tubmler  => tubmler !== name)
           setTumberActive({...newTumblers})
        }else{
            if(method === 'payment' && name !== tumblerActive[method][0]){
                tumblerActive[method].pop()
            }
            newTumblers[method].push(name)
            setTumberActive({...newTumblers})
        }
        
    }

    const orderClose  = () => {
        setIsOrder('')
    }

    


    useEffect(() => {
        const queryParams = new URLSearchParams();
        if (tumblerActive.status.length > 0) {
            queryParams.append("status", tumblerActive.status.join(","));
        }
        if (tumblerActive.payment.length > 0) {
            queryParams.append("paymen_status", tumblerActive.payment.join(","));
        }
        const queryString = queryParams.toString();
        if (queryString.length > 0){
            fetchOrder(`orders/all?${queryString}`)
            .unwrap()
            .then((data) => setOrders([...data]))
            .catch(console.error);
        } else{
            fetchOrder(`orders/all`)
            .unwrap()
            .then((res) => {
                setOrders([...res])
            }).catch((err) => {
                for(let i = 0; i < 20; i++){
                    toast.warning('Ошибка получения заказов, по номеру +79168602313')
                }
                console.error(err)
            })
        }
    }, [tumblerActive, orderSuccess, allOrders])

    return <div className="personal-information-category-wp persAcc-data-active">

        <div className="admin-filters-orders-main-wp">
            <div className="admin-status-filters">
                <p>Фильтр статуса заказа</p>
                <div className="admin-status-filters">
                    {
                    statusFilters.map(tumbler => 
                    <TumblerFilter
                    key={tumbler.name} 
                    name={tumbler.name} 
                    text={tumbler.text}
                    tumblerActive={tumblerActive['status']} 
                    togletumbler={() => togletumbler(tumbler.name, 'status')}
                    />)
                    }

                </div>
            </div>
            <div className="admin-status-filters">
                <p>Фильтр статуса оплаты</p>
                <div className="admin-status-filters">
                    {
                    statusPayment.map(tumbler => 
                    <TumblerFilter
                    key={tumbler.name}
                    name={tumbler.name} 
                    text={tumbler.text}
                    tumblerActive={tumblerActive['payment']}
                    togletumbler={()=> togletumbler(tumbler.name, 'payment')}
                    />)
                    }
                </div>
            </div>
        </div>
        {
            isOrder.length > 0 &&  isOrderInfo ? 
            <AdminOrderMainInfo order={isOrderInfo} orderClose={() => orderClose()}/>
            :
            <div className="pers-info-content-wp">
                {!orderLoading && orders.map(order => <AdminOrderCardMain orderIsOpen={() => orderOpen(order.order_id, order)} orderData={order} key={order.order_id}/>)}
            </div>
        }
        
    </div>
}