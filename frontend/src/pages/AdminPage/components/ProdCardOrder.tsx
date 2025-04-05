import { ProductInterface } from "./OrdersMain";


export default function ProdCardOrder({product_id, quantity}: ProductInterface){
    return <div style={{display:'flex', gap:20, backgroundColor:'#234293', padding:10, borderRadius:10, boxSizing:'border-box'}}>
        ID Товара - {product_id}|
        Кол-во:{quantity}|
    </div>
}