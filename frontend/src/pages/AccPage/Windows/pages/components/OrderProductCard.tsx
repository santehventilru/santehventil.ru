import { Link } from "react-router-dom"
import { OrderProductInterface } from "../type"



const OrderProductCard = ({filename,  product_id,quantity}:OrderProductInterface) => {

    return <Link className="oreder-info-prodacut-item" to={`/product/santeh/id/${product_id}`} id={String(product_id)} >
        <img className="order-info-product-img" src={`/img/${filename}.webp`} alt={filename}/>
        <span className="product-count">{quantity}</span>
    </Link>
}

export default OrderProductCard