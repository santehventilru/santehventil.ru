import {Link} from "react-router-dom"
import { plusFavActive} from "@toolkit/slices/favProdSlice"
import { useDispatch} from "react-redux"
import { AppDispatch} from "@toolkit/store/store"
import { addToCartApi } from "@api/cart/cartApi"
import { plusCartCount } from "@toolkit/slices/cartSlice"
import { toggleFavoriteApi } from "@api/favApis"
import {toast} from 'react-toastify'
import FavBtn from "@shared/ui/FavBtn"
import SvgMagni from '@shared/assets/svg/SvgMagni.svg'
import SvgCart from '@shared/assets/svg/SvgCart.svg'



export default function InnerCardNav({product_id, url}:{product_id:number, url:string}){

    const dispatch = useDispatch<AppDispatch>()

    const toogleFav = async () =>{
        try {
            const result  = await toggleFavoriteApi(product_id)
            if(result){
                dispatch(plusFavActive())
                toast.success('Избранное обновлено')
            }else{
                toast.error('Ошибка добавления')
            }

        } catch (error) {
            
        }
    }
    const addToCart = async () => {
        try {
            const result = await addToCartApi(product_id)
            if(result){
                dispatch(plusCartCount())
                toast.success('Товар добавлен в корзину')
            }else{
                toast.error('Ошибка добавления')
            }
        } catch (error) {
            console.error('Error fetching cart data:', error);
            return null;
        }
    }

    return <span className="nav-cart">
                        
                <a className="nav-cart-cont nav-cart-cont-basket" onClick={addToCart}>
                    <img className="svg-corzina" src={SvgCart} alt="cartSvg"/>
                </a>
                <FavBtn toogleFav={() => toogleFav()} prodID={product_id}/>
                <Link className="nav-cart-cont" to={url}>
                    <img className="svg-lups" src={SvgMagni} alt="Magnivg"/>
                </Link>
            </span>
}