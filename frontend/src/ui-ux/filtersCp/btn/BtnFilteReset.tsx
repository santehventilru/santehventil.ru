import {useDispatch, useSelector} from 'react-redux'
import {resetFilter, setToogleMobalWindow} from '../../../../redux_tollkit/slices/filterSlice/charFilterSlice'
import { resetProducts } from '@reduxSlice/catalogSlice'
import { AppDispatch, RootState } from 'redux_tollkit/store/store'





export default function BtnFilterReset(){

    const width = useSelector((state:RootState) => state.windowsSlice.windowSize)
    const dispatch = useDispatch<AppDispatch>()
    const breakPoint = 991
    // const status = useSelector((state: RootState) => state.charFilterSlice.filterReset)
    const handelClick = () =>{  
        if(width < breakPoint){
            dispatch(setToogleMobalWindow())
        }
        dispatch(resetProducts())
        dispatch(resetFilter())
    }

    return <button className="button button-filter-reset" onClick={handelClick} >Сбросить</button>
}