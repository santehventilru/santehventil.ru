import svg from '../assets/itemServ.svg'
import {motion , AnimatePresence} from 'framer-motion'

export default function DropDownItem({headeText,mainText, id, active, onClick}:
    {headeText:string, mainText:string, id:string, active:string, onClick:() => void}){


    return <div className='question-item-wp' onClick={onClick}>
    <div className='question-item-header'>
        <p className='question-item-header-text'>{headeText}</p>
        <img className={`svg-lt ${active === id && 'svg-lt-transform'}`} src={svg} alt="" />
    </div>
    <AnimatePresence>
        {active === id && <motion.div 
        className='question-item-main-text'
        initial={{y:-40,opacity:0}}
        animate={{y:0, opacity:1}}
        exit={{y:-40, opacity:0}}
        transition={{duration:0.3}}
        >
            {mainText}
        </motion.div>}
    </AnimatePresence>
</div>
}