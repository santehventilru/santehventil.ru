import React, {  useState } from "react"
import SlideMain from "../ui/SlideMain"
import SliderRound from "../ui/SliderRound"
import {AnimatePresence, motion} from "framer-motion"
import { Link } from "react-router-dom"
import { ARRY_SLIDER } from "@shared/constants/constants"
import { SLIRDER_ROUND } from "@shared/constants/constants"
import arrowLeft from '../assets/arrowBack.svg'
import arrowRight from '../assets/arrowForward.svg'
import laylotySvg from'../assets/loalotySvg.svg'



const  PromoSection= React.memo(() => {


    const [isIndex, setIndex] = useState<number>(0)
    const [isLeft , setLeft] = useState<boolean>(true)

    const handelNext = () => {
        let index  = isIndex + 1
        if(ARRY_SLIDER.length - 1  < index){
            setIndex(0)
        }else{
            setIndex(index )
            setLeft(false)
        }
    }
    const handelPrev = () => {
        let index  =  isIndex - 1 
        if(0 >   index){
            setIndex(ARRY_SLIDER.length - 1)
        }else{
            setIndex(index)
            setLeft(true)
        }
    }

   

    


    return <section id="promo">
            
    <div className="container  container-promo"> 

        <div className="bg-round-main-promo"></div>
        <div className="slider-wp-for-nav" id="slider-art-wp">
            <article className="item-big-promo " id="main-promo-info">
                <AnimatePresence mode="wait">
                    <motion.div
                    key={isIndex}
                    initial={{x:isLeft ? -100 : 100, opacity:0}}
                    animate={{opacity:1, x:0}}
                    exit={{x:isLeft ? 100 : -100, opacity:0}}
                    transition={{duration:0.3}}
                    style={{
                        height:'100%',
                        position:'relative'
                    }}

                    >
                    
                        {ARRY_SLIDER.map((slide ,index) => (
                            index === isIndex ? <SlideMain key={slide.path + String(index)} {...slide}/> : null
                            
                        ))}
                    </motion.div>
                </AnimatePresence>
            </article>

            <div className="slider-article-nav">
                <button id="btn-lf-art" className="btn-artcile-slider" onClick={handelPrev} >
                    <img className="slider-svg-art" src={arrowLeft} alt="arrow" />
                </button>
                <div className="round-slider-wp">
                    {SLIRDER_ROUND.map(round => <SliderRound key={round.slideIndex} isIndex={isIndex} {...round}/>)}
                </div>
                <button id="btn-rt-art" className="btn-artcile-slider" onClick={handelNext}>
                    <img className="slider-svg-art" src={arrowRight} alt="arrow" />
                </button>
            </div>
        </div>

        <div className="container-item-promo">
            <article className="item-promo-1">
               
                <h2 className="text-poromo-titel--itme2" id="art2">Комплектующие<wbr/> для теплого пола</h2>
                
                <Link to="/product/8-otoplenie/20-tyoplye-poly" style={{alignSelf:'end'}}>
                <img style={{width:40 , height:40}} src={arrowRight} alt="arrow" />
                </Link>

            </article>

            <article className="item-promo-2">
                <div style={{
                    display:'flex',
                    flexDirection:'column'
                    }}>
                    <h2 className="text-poromo-titel--itme2">Программа лояльности</h2>
                    <p className="text-pormo-item2">
                        Преимущества и скидки <br/>
                        для юр. лиц
                    </p>
                    <img className="svg-promo-position" style={{width:86, height:85} } src={laylotySvg} alt="svgLoyut" />
                    
                </div>
                
                    
                <a href="/loyaltyProg" className="button-promo--loyalty">
                    Ознакомиться
                </a>
            </article>
            
        </div>
    </div>
</section>
})
export default PromoSection