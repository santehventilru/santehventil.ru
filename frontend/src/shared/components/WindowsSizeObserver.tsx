import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "redux_tollkit/store/store"
import {setWindowsSize} from '../../../redux_tollkit/slices/windowsSlice'
import { setCartRowCount } from "@reduxSlice/catalogSlice"



export default function  WindowsSizeObserver(){

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        let ID: NodeJS.Timeout;
            const Resize = () => {
                if(ID) clearTimeout(ID)
                ID  = setTimeout(() => {
                    dispatch(setWindowsSize(window.innerWidth))
                    dispatch(setCartRowCount(window.innerWidth))
                }, 10)
                
            }
            Resize()
            window.addEventListener('resize', Resize)
            return () => {
                window.removeEventListener('resize', Resize)
                if(ID) clearTimeout(ID)
            }
        },[dispatch])
    

    return null
}