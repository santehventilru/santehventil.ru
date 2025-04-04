import {  useState } from "react"
import { changeQuanApi, deleteProdcutCartApi } from "../../api/cart/cartApi"
import BtnMinus from "../CartCp/BtnMinus"
import BtnPlus from "../CartCp/BtnPlus"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../redux_tollkit/store/store"
import {plusCartCount, minusCartItem, setCartCount,  deleteProduct} from '../../../redux_tollkit/slices/cartSlice'
import {AnimatePresence, motion} from 'framer-motion'
import BtnDelete from "../CartCp/BtnDelete"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { Trascription } from "../../funcHelper/Transcription"



export default function CartCard({quantity,productImage,productName,productPrice, product_id, cartType, productpath}
    :{quantity:number,productImage:string,productName:string, productPrice:string,product_id:number, cartType:string, productpath:string }){

    const NumberPrice  = Number(productPrice)
    const [quantityChek, setQuantity] = useState<number>(quantity)
    const [statusCart, setStatusCart] = useState<boolean>(true)
    const dispatch = useDispatch<AppDispatch>()
    const totalCount  = useSelector((state:RootState) => state.cartSLice.cartCount)


    const changeQuant = async (newQuant: number) => {
        if(newQuant > 0 ){
            try {
                const result  = await changeQuanApi(product_id , newQuant)
                if(result){
                    setQuantity(newQuant)
                    if(newQuant > quantityChek){
                        dispatch(plusCartCount())
                    }else{
                        dispatch(minusCartItem())
                    }
                }
            } catch (error) {
                console.error('Error fetching cart data:', error);
                return null;
            }
        }
        
    }

    const deleteProductA = async () => {
        try {
            const result = await deleteProdcutCartApi(product_id)
            if(result){
                setStatusCart(false)
                dispatch(setCartCount(totalCount - quantityChek))
                dispatch(deleteProduct(product_id))
                toast.success('Товар удален из корзины')
            }
        } catch (error) {
            
        }
    }

    const nameEn  = Trascription.toTranscription(productName.split(' ').join('-'))
    const productPath = Trascription.toTranscription(productpath.split(' ').join('-'))

    // useEffect(() => {
    //     dispatch(setProductsID(product_id))
    // },[])

    // useEffect(() => {

    // },[totalCount])

    return <AnimatePresence>
             {statusCart && <motion.div className={ `${cartType === 'no-modal' ? 'kozina-cart-wp-page ': 'kozina-cart-wp'}`} id={String(product_id)}
                initial={{opacity:0}}
                animate={{opacity:1}}
                exit={{opacity:0}}
                transition={{duration:0.3}}
                
                >
                    <div className='basket-pop-item-ferst'>
                    <div className='count-basket-item'>{quantity}</div>
                    <Link to={`/productpage/${product_id}/${nameEn}/${productPath}`} className='basket-photo-item'>
                        <img src={productImage} alt={productName} className='photo-basket-item-size' loading="lazy"/>
                    </Link>
                    <div className="kozina-cart-item">{productName}</div>
                    <div className="kozina-button-wp">
                        <BtnDelete deleteProduct={deleteProductA}/>
                    </div> 
                    </div>
                    <div className='basket-pop-item-second'>
                        <div className='item-count-basket-pop-wp'>
                        <BtnMinus quantity={quantityChek} changeQuant={changeQuant}/>
                        <BtnPlus quantity={quantityChek} changeQuant={changeQuant}/>
                        </div>
                        <div className='item-sum-price-pop-basket--wp'>
                        <p className='item-sum-price-pop-basket--text'>Цена:</p>
                        <div className='item-sum-price-pop-basket'>{(Math.round(NumberPrice)* quantity).toLocaleString('ru')}₽</div>
                        </div>
                    </div>
                </motion.div>}   
             
</AnimatePresence>
}