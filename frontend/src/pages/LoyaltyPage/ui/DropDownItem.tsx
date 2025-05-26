import { useEffect, useRef, useState } from 'react'
import svg from '../assets/itemServ.svg'
import {motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { RootState } from '@toolkit/store/store'


const DEF_HEIGHT = 110

export default function DropDownItem({headeText,mainText, id, active, onClick}:
    {headeText:string, mainText:string, id:string, active:string, onClick:() => void}){
    const windowSize  = useSelector((st:RootState) => st.windowsSlice.windowSize)
    const height = useRef<HTMLDivElement>(null)
    const [newHeight, setHeight]  = useState<number>(DEF_HEIGHT)

    useEffect(() => {
        if(height.current){
            setHeight(height.current.scrollHeight + 88)
        }
    },[windowSize])
    

    return <motion.div className='question-item-wp'
    animate={{height:`${active === id ?`${newHeight+ 44}px` : `${DEF_HEIGHT}px`}`}}
    transition={{ duration: 0.4 }}
    onClick={onClick}>
    <div className='question-item-header'>
        <p className='question-item-header-text'>{headeText}</p>
        <img className={`svg-lt ${active === id && 'svg-lt-transform'}`} src={svg} alt="" />
    </div>

         <div 
         ref={height}
        className='question-item-main-text'
        style={{opacity: `${active === id  ? '1' : '0'}`,
        transition:'300ms all'
        }}
        >
            {mainText}
        </div>

</motion.div>
}