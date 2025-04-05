import {AnimatePresence, motion} from 'framer-motion'
import { useEffect} from 'react'
import {  modalResponse, ProductsFavCart } from '../../type'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@toolkit/store/store'
import CartNoItem from '../../ui/CartNoItem'
import FavCard from './ui/FavCard'
import { addToFav, minusFavPassive, plusFavActive, setFavCount, setToogleFav } from '@toolkit/slices/favProdSlice'

import Api from '@api/apiService'
// import { AddToCart } from '@shared/services/cartApi'
import { plusCartCount } from '@toolkit/slices/cartSlice'
import { toast } from 'react-toastify'
// import { toggleFavoriteApi } from '@api/favApis'

export default function FavModal(){

    const favCount = useSelector((state:RootState) => state.favProductsSlice.favCount)
    const favStatus  =  useSelector((state:RootState) => state.favProductsSlice.favStatus)
    const favUpdate = useSelector((state:RootState) => state.favProductsSlice.favUpdate)
    const productFav = useSelector((state:RootState) => state.favProductsSlice.favProductsArr)
    // const [favList, setFavList] = useState<CartItemInertFace[] | null>()
    const cartType = 'modal'
    const dispatch = useDispatch<AppDispatch>()
    const handelFav = () => dispatch(setToogleFav())


    const AddToCart = (product_id:number) => {
        Api.post('/api/addtocart', product_id)
        .then(() => {
            dispatch(plusCartCount())
            toast.success('Товар добавлен в корзину')

        }).catch(err => {
            console.error('Error fetching cart data:', err)
            toast.error("Ошибка добовления")

        })
    }  
     const toogleFav = (product_id:number) =>{
        Api.post('/api/favorites/toggle', product_id)
        .then(() => {
            dispatch(plusFavActive())
        }).catch(err => console.error(err))
    }

    useEffect(() => {
        Api.get<modalResponse>('/api/fav')
        .then((res) => {
            if(res.products.length > 0 ){
                dispatch(addToFav({prod: res.products}))
                dispatch(setFavCount(res.products.length));
            }else{
                dispatch(addToFav({ prod: res.products })); 
                dispatch(setFavCount(0));
            }
        })
        .catch((err) => {
            console.error("Ошибка получения данных", err)
        })
        // getFav()
        dispatch(minusFavPassive())
  }, [favUpdate])

    return <AnimatePresence>
    {
        favStatus && <motion.div className="kozina-modal-container-wp"
        initial={{x:1000, opacity:0}}
        animate={{x:0, opacity:1}}
        exit={{x:1000, opacity:0}}
        transition={{ duration: 0.3,
            // ease: "easeIn",
        }}
        >
        <div className="kozina-modal-wp">
            {favCount > 0 && productFav?.map((product:ProductsFavCart)  => <FavCard toogleFav={() => toogleFav(product.product_id)} AddToCart={() => AddToCart(product.product_id)} key={product.product_id} cartType={cartType} {...product}/>)}
            {favCount === 0 && <CartNoItem/>}
            
        </div>
        <div className="buttons-korzina-wp" style={{justifyContent:'center'}}>
            <button className="button button-korzina" id="BasketClose" onClick={handelFav} >Закрыть</button> 
        </div>
    </motion.div>
    }
            
</AnimatePresence>
}