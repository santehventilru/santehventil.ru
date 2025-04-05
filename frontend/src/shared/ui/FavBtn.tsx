import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@toolkit/store/store"
import Acitve from "@shared/assets/svg/FavActivSvg.svg"
import Passive from "@shared/assets/svg/FavPassiwSvg.svg"


export default function FavBtn({toogleFav, prodID}:{toogleFav:()=> void, prodID:number}){

    const [isFav, setFav] = useState<boolean>(false)
    const favList  = useSelector((state:RootState) => state.favProductsSlice.favProducts)

    useEffect(() => {
        setFav(favList.includes(prodID))
    },[favList, prodID])

    

    return <button className="nav-cart-cont" onClick={toogleFav} title="Добавить в избранное"> 
        {isFav ?
            <img className="svg-like-ready" src={Acitve} alt="svgActive" /> 
        :
            <img className="svg-like" src={Passive} alt='Passive' />
        }
        </button>
}