
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

    return <div className='order-info-main-wp'>
            
                <div className="order-info-basic-flex">
                    <h3 className="orderMoreSetionName">Доствака</h3>
                    <div className="order-line-one  order-delivery flex-column">
                        <p>Способ: <span className="order-inf-dop-color">{trascriptPayment[delivery_type] || 'не указан'}</span></p>
                        <p>Адресс: <span className="order-inf-dop-color">{delivery_address || 'не указан'}</span></p>
                    </div>
                </div>
            <div className="order-info-basic-flex">
                <h3 className="orderMoreSetionName">Товары в заказе</h3>
                <div className="order-line-one oreder-info-product-wp">
                    <div className="order-info-product-list">
                        {items.map(product => <OrderProductCard key={product.product_id}  {...product}/>)}
                    </div>
                </div>
            </div>
            <div className="order-info-basic-flex">
                <h3 className="orderMoreSetionName">Цена и Способ оплаты</h3>
                <div className="order-line-one flex-column order-item-price">
                    {
                        Number(delivery_price) > 0  && <p>Цена доставки: <span className="order-inf-dop-color">{Math.round(Number(delivery_price)).toLocaleString('ru')}р</span></p>
                    }
                    <p>Цена товаров: <span className="order-inf-dop-color">{Math.round(Number(total_price)).toLocaleString('ru')}р</span></p>
                    <p>Конечаная цена: <span className="order-inf-dop-color">{Math.round(Number(total_price) + Number(delivery_price)).toLocaleString('ru')}р</span></p>
                    <p>Способ оплаты: <span className="order-inf-dop-color">{typePayment[payment] || 'не указан'}</span></p>
                    {/* <p>Доставкв: <span className="order-inf-dop-color">${delivery.price}р</span></p> */}
                    {/* <p>Итог: <span className="order-inf-dop-color">${Math.round(order[0].total_price) + +delivery.price}р</span></p> */}
                </div>
            </div>

        </div>
        
        {/* <p>{payment}</p> */}
        {/* <p>{total_price}</p> */}
        {/* <p>{delivery_type}</p> */}
        {/* <p>{delivery_address}</p> */}

}