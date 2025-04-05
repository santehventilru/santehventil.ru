// import FavCardBtn from "@shared/widgets/FavoriteModal/FavCartBtn";
import ScrollTopRender from "./ScrollTopRender";
import ScrollUp from "./ScrollUp";
import WindowsSizeObserver from "./WindowsSizeObserver";


export default function HellperWrapper(){
    return (
        <>
            <WindowsSizeObserver/>
            <ScrollTopRender/>
            <ScrollUp/>
        </>
    )
}