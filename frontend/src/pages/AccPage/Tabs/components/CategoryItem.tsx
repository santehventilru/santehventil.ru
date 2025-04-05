import { useDispatch, useSelector } from "react-redux"
import {setActiveTabs} from '@toolkit/slices/categorySlice'
import TabsSvg from '@shared/assets/svg/index'
const {SvgAcc, SvgFav, SvgAdr, SvgOrders, SvgSup, SvgAdminOrder, SvgAdminService, SvgAdminUser} = TabsSvg
import { RootState } from "@toolkit/store/store"


export default function CategoryItem({catagor, text}:{catagor: string, text:string}){
    const dispatch = useDispatch()

    const tabsSvg = [
        {key:'acc', svgItem: <SvgAcc/>},
        {key:'address', svgItem: <SvgAdr/>},
        {key:'fav', svgItem: <SvgFav/>},
        {key:'orders', svgItem: <SvgOrders/>},
        {key:'supp', svgItem: <SvgSup/>},
        {key:'adminorder', svgItem:<SvgAdminOrder/>},
        {key:'adminservice', svgItem:<SvgAdminService/>},
        {key:'adminuser', svgItem:<SvgAdminUser/>},

    ]
    const activeTabs  = useSelector((state: RootState) => state.categorTabsSlice.activeTabs)

    const handelTabs = () => {
        dispatch(setActiveTabs(catagor))
    }

    return <li className="categor-item" id="1" onClick={handelTabs}>
            <div className="categor-item-cont">
                {tabsSvg.map(cat => cat.key === catagor ? cat.svgItem : null)}
                <div className={`categor-text ${catagor === activeTabs && `categor-text-active`} `} id="Acc">{text}</div>
            </div>
            <div className={`line-categori ${catagor === activeTabs && `line-active`}`}></div>
        </li>
}