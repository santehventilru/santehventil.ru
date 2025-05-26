import { useMemo, useState } from "react";
import { orderInterFace } from "../type";
import TumblerFilter from "@pages/AdminPage/components/TubmlerFilter";
import OrderItem from "./OrderItem";
import CartNoItem from "@shared/ui/CartNoItem";


interface Props{
    orderData: orderInterFace[] | null 
    orderDataString: string;
}
export default function OrderData({ orderData, orderDataString }: Props) {
    const [showActive, setShowActive] = useState(true);

    const { activeOrders, closedOrders } = useMemo(() => {
        const active: orderInterFace[] = [];
        const closed: orderInterFace[] = [];

        if (orderData) {
            for (let order of orderData) {
                if (order.status === 'order-close') {
                    closed.push(order);
                } else {
                    active.push(order);
                }
            }
        }

        return { activeOrders: active, closedOrders: closed };
    }, [orderDataString]);

    const toggleTumbler = () => {
        setShowActive((prev) => !prev);
    };

    const hasOrders = orderData && orderData.length > 0;

    return (
        <div className="оrders-category-wp persAcc-data-active">
            <div className="flex flex-top">
                <h2 className="heading-text-pers-info">Ваши заказы</h2>

                    <div className="btn-flex">
                        
                        <button className="text btn-text btn-text-end">Доставленные</button>
                        <TumblerFilter
                            togletumbler={toggleTumbler}
                            name="false"
                            text=""
                            tumblerActive={[`${showActive}`]}
                        />
                    </div>
            </div>

            <div className="order-item-wp">
                {hasOrders && showActive &&
                    activeOrders.map((order) => <OrderItem key={order.order_id} {...order} />)}
                {hasOrders && !showActive &&
                    closedOrders.map((order) => <OrderItem key={order.order_id} {...order} />)}

                {!hasOrders && <CartNoItem key={'Нет заказов'} text={'Нет заказов'}/>}
                {hasOrders && !showActive && closedOrders.length === 0 && (
                    <CartNoItem  key={'Нет закрытых заказов'} text={'Нет закрытых заказов'}/>
                )}
                {hasOrders && showActive && activeOrders.length === 0 && (
                    <CartNoItem key={'Нет активных заказов'} text={'Нет активных заказов'}/>
                )}
            </div>
        </div>
    );  
}
