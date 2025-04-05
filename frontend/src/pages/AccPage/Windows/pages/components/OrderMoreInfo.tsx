
import { OrderMoreInfoInterface } from "../type"
import OrderProductCard from "./OrderProductCard"



export default function OrderMoreInfo({items,payment, total_price,delivery_type,delivery_address, delivery_price}:OrderMoreInfoInterface){

    const trascriptPayment:  Record<string, string> = {
        SelfCall:'Самовызов',
        Courier:'Доставка',
        Express:"Экспрес доставка",
        TransferLine:"До траспортной линии"

    }
    const typePayment:  Record<string, string>  = {
        Card:'Картой',
        Cash:"Наличные"

    }

    return <div className='number-of-order'>
        <div className='order-info-header'>Информаиця о заказе
            {/* <div className="btn-order-info-wp">
                        
                <div className='order-info-close'>
                    <svg className="svg-order-info-close" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path clip-rule="evenodd" d="m7.53033 6.46967c-.29289-.29289-.76777-.29289-1.06066 0s-.29289.76777 0 1.06066l4.46963 4.46967-4.46963 4.4697c-.29289.2929-.29289.7677 0 1.0606s.76777.2929 1.06066 0l4.46967-4.4696 4.4697 4.4696c.2929.2929.7677.2929 1.0606 0s.2929-.7677 0-1.0606l-4.4696-4.4697 4.4696-4.46967c.2929-.29289.2929-.76777 0-1.06066s-.7677-.29289-1.0606 0l-4.4697 4.46963z"  fill-rule="evenodd"></path></g></svg>
                </div>
            </div> */}
        </div>
        <div className='order-info-main-wp'>
            <div className="order-info-basic-flex" id="order-info-data">
                <div className="order-info-basic-flex">
                    Доствака
                    <div className="order-line-one flex-row order-delivery">
                        <p>Способ: <span className="order-inf-dop-color">{trascriptPayment[delivery_type]}</span></p>
                        <p>Адресс: <span className="order-inf-dop-color">{delivery_address}</span></p>
                    </div>
                </div>
            </div>
            Товары в заказе
            <div className="order-line-one oreder-info-product-wp">
                <div className="order-info-product-list">
                    {items.map(product => <OrderProductCard key={product.product_id}  {...product}/>)}
                </div>
            </div>
            Цена и Способ оплаты
            <div className="order-line-one flex-row order-item-price">
                <p>Цена доставки: <span className="order-inf-dop-color">{Math.round(Number(delivery_price))}р</span></p>
                <p>Цена товаров: <span className="order-inf-dop-color">{Math.round(Number(total_price))}р</span></p>
                <p>Конечаная цена: <span className="order-inf-dop-color">{Math.round(Number(total_price + delivery_price))}р</span></p>
                <p>Способ оплаты: <span className="order-inf-dop-color">{typePayment[payment]}</span></p>
                {/* <p>Доставкв: <span className="order-inf-dop-color">${delivery.price}р</span></p> */}
                {/* <p>Итог: <span className="order-inf-dop-color">${Math.round(order[0].total_price) + +delivery.price}р</span></p> */}
            </div>

        </div>
        
        {/* <p>{payment}</p> */}
        {/* <p>{total_price}</p> */}
        {/* <p>{delivery_type}</p> */}
        {/* <p>{delivery_address}</p> */}
    </div>
}