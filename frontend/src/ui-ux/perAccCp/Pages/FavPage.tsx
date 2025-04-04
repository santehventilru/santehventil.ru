import { useEffect, useState } from "react";
import { addToFav, minusFavPassive, setFavCount } from "../../../../redux_tollkit/slices/favProdSlice";
import FavCard from "../../Cards/FavCard";
import CartNoItem from "../../CartCp/CartNoItem";
import { getFavApi } from "../../../api/favApis";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux_tollkit/store/store";
import { CartItemInertFace } from "../../../types/interface";



export default function FavPage(){



    const favCount = useSelector((state:RootState) => state.favProductsSlice.favCount)
    const favUpdate = useSelector((state:RootState) => state.favProductsSlice.favUpdate)
    const [favList, setFavList] = useState<CartItemInertFace[] | null>()
    const cartType = 'no-modal'
    const dispatch = useDispatch<AppDispatch>()

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
                    {favCount > 0 && favList?.map(product => <FavCard key={product.product_id} cartType={cartType} {...product}/>)}
                    {favCount === 0 && <CartNoItem/>}
                </div>
            </div>
}