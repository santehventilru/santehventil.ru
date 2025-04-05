import { useNavigate} from "react-router-dom"
import {AnimatePresence , motion} from 'framer-motion'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@toolkit/store/store"
import CartNoItem from "../../ui/CartNoItem"
import { getCartApi } from "@api/cart/cartApi"
import { setCartCount } from "@toolkit/slices/cartSlice"
import { useEffect, useState } from "react"

import CartCard from "./components/CartCard"
import {setChangeCartStatus}  from '@toolkit/slices/cartSlice'
import { CartItemInertFace } from "@shared/type"
// import Api from "@api/apiService"






export default function ModalCart(){
    


    const cartStatus  = useSelector((state:RootState) => state.cartSLice.cartStatus)
    const [products, setProduts] = useState<CartItemInertFace[] | null>()
    const [totalSum, setTotalSum] = useState<number>(0)
    const navigate  = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const cartCount = useSelector((state:RootState) => state.cartSLice.cartCount)
    const cartType = 'modal'

    const closeModel = () => {
        dispatch(setChangeCartStatus(false))
        navigate("/making_order")
    }

    const getCart = async () => {
        try {
          const result = await getCartApi()
          if(result){
            const resArr  = result.products
            const sum = result.totalPrice
            setProduts(resArr)
            if(result.products.length == 0 ){
                dispatch((setCartCount(Number(result.products.length) )))
                setTotalSum(Number(sum))
            }else{
                const newCount  = resArr.reduce((acc:number, item:{quantity:number}) => 
                  {acc += Number(item.quantity)
                    return acc
                  }, 0)
                dispatch(setCartCount(newCount))
                setTotalSum(Number(sum))
            }
          }
        } catch (error) {
          console.error('Error fetching cart data:', error);
            return null;
        }
    }

    useEffect(() => {
        getCart()
    },[cartCount])


    

    return <AnimatePresence>
        {
            cartStatus && <motion.div className="kozina-modal-container-wp"
            initial={{x:1000, opacity:0}}
            animate={{x:0, opacity:1}}
            exit={{x:1000, opacity:0}}
            transition={{ duration: 0.3,
            }}
            >
            <div className="kozina-modal-wp">
                {cartCount > 0 && products?.map(product => <CartCard key={product.product_id} cartType={cartType} {...product}/>)}
                {cartCount === 0 && <CartNoItem/>}
                
            </div>
            <div className="buttons-korzina-wp">
                <button className="button button-korzina"  id="making-btn" onClick={closeModel}>Оформить</button>
                <button className="button button-korzina" id="BasketClose" onClick={() => dispatch(setChangeCartStatus(!cartStatus))} >Закрыть</button>
                <div className="total-price-wp">
                    <div className="total-basket-pirce-text">Общая сумма:</div>
                    <div className="total-basket-pirce-wp">
                        <div className="total-basket-pirce">{Math.floor(totalSum).toLocaleString('ru')}</div>
                        <div className="valuta-basket">₽</div>
                    </div>
                </div>
            </div>
        </motion.div>
        }
                
</AnimatePresence>
}