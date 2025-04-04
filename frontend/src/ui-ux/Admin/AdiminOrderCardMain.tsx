
import { orderInterFace } from "../../types/interface";



export default function AdminOrderCardMain({orderData, orderIsOpen}:{orderData:orderInterFace, orderIsOpen:() => void}){


    const dateReform = orderData.order_date.split('T').slice(0,1)[0].split('-').reverse().join('.')
    

    type OrderStatus = {
        [key: string]: string;
      };
      
      const orderStatusTranslation: OrderStatus = {
        'wait-order': 'Обработка заказа',
        'for-payment':"К оплате",
        'order-create': 'Заказ создан',
        'order-post': 'Передается в доставку',
        'in-way': 'В пути',
        'order-close': 'Доставлен',
      };

    //   console.log()orderData

    

    return <div style={{display:'flex', flexDirection:'column', gap:20}} id={`${orderData.order_id}`}>
    
        <div className="admincard-wp">
            <div>Номер: №{orderData.order_id}</div>
            <div>От: {dateReform}</div>
            <div>Сатус: {orderData && orderStatusTranslation[orderData.status]}</div>
            <button className="order-details-definite" onClick={orderIsOpen}>Детали заказа</button>
        </div>   
    </div>
}