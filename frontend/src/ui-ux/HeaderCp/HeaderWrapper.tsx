import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "redux_tollkit/store/store"
import Header from "../../funcCp/Header"
import MobailHeader from "./MobailHeader"
import { useMemo } from "react"
import {setToogleCart } from "@reduxSlice/cartSlice"


const DESKTOP_BREAKPOINT = 481;

export default function HeaderWrapper(){

    const windowSize  =  useSelector((state:RootState) => state.windowsSlice.windowSize)
    const dispatch = useDispatch<AppDispatch>()
    const toogleCart = () => dispatch(setToogleCart())


    const HeaderComponent = useMemo(() => {
        return windowSize >= DESKTOP_BREAKPOINT
          ? <Header handelCart={toogleCart} /> 
          : <MobailHeader handelCart={toogleCart} />;
      }, [windowSize, toogleCart])
    
      return HeaderComponent
}