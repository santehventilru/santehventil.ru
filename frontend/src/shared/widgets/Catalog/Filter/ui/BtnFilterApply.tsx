import { useDispatch, useSelector} from "react-redux"
import {setActive, setToogleMobalWindow} from '@toolkit/slices/filterSlice/charFilterSlice'
import { AppDispatch, RootState } from "@toolkit/store/store"
import { resetProducts } from "@reduxSlice/catalogSlice"

export default function BtnFilterApply(){

    const width = useSelector((state:RootState) => state.windowsSlice.windowSize)
    const dispatch = useDispatch<AppDispatch>()
    const breakPoint = 991

    const handelBtn = () => {
        if(width < breakPoint){
            dispatch(setToogleMobalWindow())
        }
        dispatch(resetProducts())
        dispatch(setActive(true));
    }

    return <button className="button button-filter" onClick={handelBtn}>Применить</button>
}