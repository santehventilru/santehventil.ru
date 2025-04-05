import { useEffect, useState } from "react";
import { addToFav, minusFavPassive, plusFavActive, setFavCount } from "@toolkit/slices/favProdSlice";

import CartNoItem from "@shared/ui/CartNoItem";
import { getFavApi } from "@api/favApis";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@toolkit/store/store";
import { CartItemInertFace } from "@shared/type";
import Api from "@api/apiService";
import { toast } from "react-toastify";
import { plusCartCount } from "@toolkit/slices/cartSlice";
import FavCard from "@shared/widgets/FavoriteModal/ui/FavCard";




export default function FavPage(){



    const favCount = useSelector((state:RootState) => state.favProductsSlice.favCount)
    const favUpdate = useSelector((state:RootState) => state.favProductsSlice.favUpdate)
    const [favList, setFavList] = useState<CartItemInertFace[] | null>()
    const cartType = 'no-modal'
    const dispatch = useDispatch<AppDispatch>()

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

    
    return <div className="favourites-category-wp persAcc-data-active">
                <h2 className="heading-favourites-text">Избранное</h2>
                <div className="favourites-item-list-wp">
                    {favCount > 0 && favList?.map(product => <FavCard
                     AddToCart={() => AddToCart(product.product_id)}
                     toogleFav={() => toogleFav(product.product_id)}
                      key={product.product_id}
                       cartType={cartType}
                        {...product}/>)}
                    {favCount === 0 && <CartNoItem/>}
                </div>
            </div>
}