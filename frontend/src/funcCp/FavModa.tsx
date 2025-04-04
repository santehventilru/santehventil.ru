import {AnimatePresence, motion} from 'framer-motion'
import { useEffect, useState } from 'react'
import { CartItemInertFace } from '../types/interface'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux_tollkit/store/store'
import CartNoItem from '../ui-ux/CartCp/CartNoItem'
import FavCard from '../ui-ux/Cards/FavCard'
import { addToFav, minusFavPassive, setFavCount, setToogleFav } from '../../redux_tollkit/slices/favProdSlice'
import { getFavApi } from '../api/favApis'

export default function FavModal(){

    const favCount = useSelector((state:RootState) => state.favProductsSlice.favCount)
    const favStatus  =  useSelector((state:RootState) => state.favProductsSlice.favStatus)
    const favUpdate = useSelector((state:RootState) => state.favProductsSlice.favUpdate)
    const [favList, setFavList] = useState<CartItemInertFace[] | null>()
    const cartType = 'modal'
    const dispatch = useDispatch<AppDispatch>()
    const handelFav = () => dispatch(setToogleFav())

    const getFav = async () => {
    try {
        const result = await getFavApi();
        
        if (result?.products && Array.isArray(result.products)) {
         
            dispatch(addToFav({ prod: result.products }));
            dispatch(setFavCount(result.products.length));
            setFavList(result.products)
        } else {
            // console.warn("Invalid response format:", result);
            dispatch(addToFav({ prod: result.products })); // Теперь передаём объект с пустым массивом
            dispatch(setFavCount(0));
        }
    } catch (error) {
        console.error("Error fetching favorite products:", error);
    }
    };

    useEffect(() => {
        getFav()
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
            {favCount > 0 && favList?.map(product => <FavCard key={product.product_id} cartType={cartType} {...product}/>)}
            {favCount === 0 && <CartNoItem/>}
            
        </div>
        <div className="buttons-korzina-wp" style={{justifyContent:'center'}}>
            <button className="button button-korzina" id="BasketClose" onClick={handelFav} >Закрыть</button> 
        </div>
    </motion.div>
    }
            
</AnimatePresence>
}