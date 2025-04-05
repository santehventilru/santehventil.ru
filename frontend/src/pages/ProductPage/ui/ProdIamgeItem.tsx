import { useState } from "react"
import {motion, AnimatePresence} from "framer-motion"


export default function ProdImageItem({add_image, changeImage, newImage}:{add_image: string, changeImage:(url:string) => void, newImage: string}){

    const [isIageUrl, setImageUrl] = useState<string>(add_image)
    const [isAcitve, setIsActive] = useState<boolean>(true)

    const handelCkick = () => {

        setIsActive(false)
        changeImage(isIageUrl) 
        setImageUrl(newImage) 
        // setIsActive(true)

        setTimeout(() => {
            // changeImage(isIageUrl) // Меняем изображение после выхода
            // setImageUrl(newImage) 
            setIsActive(true) // Возвращаем элемент после смены изображения
        }, 700)

    }


    return <AnimatePresence>
        {isAcitve && <motion.li id="1" className="dop-foto-prod-item" onClick={handelCkick}
        initial={{x:-300, opacity:0}}
        animate={{x:0, opacity:1}}
        exit={{x:-300, opacity:0}}
        transition={{duration:0.7}}
        >
                <img src={isIageUrl && isIageUrl} alt="" className="foto-prod-dop"/>
        </motion.li> }
        
    </AnimatePresence>
}