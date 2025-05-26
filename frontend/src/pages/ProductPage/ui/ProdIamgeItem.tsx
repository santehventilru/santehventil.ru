import { useState } from "react"
import {motion, AnimatePresence} from "framer-motion"


export default function ProdImageItem({add_image, changeImage, newImage}:{add_image: string, changeImage:(url:string) => void, newImage: string}){

    const [isIageUrl, setImageUrl] = useState<string>(add_image)
    const [isAcitve, setIsActive] = useState<boolean>(true)

    const handelCkick = () => {

        setIsActive(false)
        changeImage(isIageUrl) 
        setImageUrl(newImage) 

        setTimeout(() => {
            setIsActive(true) 
        }, 700)

    }


    return <AnimatePresence mode="wait">
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