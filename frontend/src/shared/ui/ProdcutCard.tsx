import { useEffect, useState } from "react";
import React from "react";
import InnerCardNav from "./InnerCardNav";
import clsx from "clsx"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../redux_tollkit/store/store"
import {AnimatePresence, motion} from "framer-motion"
import { plusFavActive} from '../../../redux_tollkit/slices/favProdSlice'
import { toggleFavoriteApi } from "../../api/favApis";
import { Link } from "react-router-dom";
import { Trascription } from "../utils/Transcription";
import Acitve from "@shared/assets/svg/FavActivSvg.svg"
import { ProductCardInterface } from "@shared/widgets/Catalog/CatalogScroll/types";


const  PorductCard =  React.memo(({product_id, name, price, main_image, sku, disc, final_price, typesCard, productpath}:ProductCardInterface) => {

    const  styleCard = typesCard
    const [isFav, setIsFav] = useState<boolean>(false)
 
    const hitsClass = 'span-none'
    

    const dispatch = useDispatch<AppDispatch>()
    
    const favList  = useSelector((state:RootState) => state.favProductsSlice.favProducts)
    const toogleFav = async () =>{
        try {
            const result  = await toggleFavoriteApi(product_id)
            if(result){
                dispatch(plusFavActive())
            }

        } catch (error) {
            
        }
    }
    const nameEn  = Trascription.toTranscription(name.split(' ').join('-'))
    const productPath = Trascription.toTranscription(productpath.split(' ').join('-'))

    useEffect(() => {
        setIsFav(favList.includes(product_id))
    },[favList, product_id])

    const saleNumber  = Number(disc)
    return <article className={clsx(`cart-wrapper cart-wrapper-catalog wp-sale`,{
            [hitsClass]: styleCard === 'hits'
            })} id={String(product_id)} itemScope itemType="https://schema.org/Product">
                <meta itemProp="sku" content={sku}/>
                
                <div className="cart catalog-cart">
                    <InnerCardNav product_id={product_id} url={`/productpage/${product_id}/${productPath}/${nameEn}`}/>

                    
                    {Number(disc) != 0 ? 
                    <div className="cart--sale">
                        <div className="sale">
                            <p className="sale-text">{disc}%</p>
                        </div>
                       
                        <AnimatePresence>
                               {isFav &&  
                                <motion.button onClick={toogleFav}
                                initial={{x:10, opacity:0}}
                                animate={{x:0, opacity:1}}
                                exit={{x:10, opacity:0}}
                                transition={{duration:0.3}}
                                style={{
                                    height:24,
                                    width:24,
                                    position:"absolute",
                                    zIndex:10,
                                    right:0,
                                    top:0
                                }}>
                                   

                                </motion.button>
                                }
                            
                        </AnimatePresence>
                    </div>
                    : 
                    <div className="cart--sale">
                        <AnimatePresence>
                               {isFav &&  
                                <motion.button onClick={toogleFav}
                                initial={{x:10, opacity:0}}
                                animate={{x:0, opacity:1}}
                                exit={{x:10, opacity:0}}
                                transition={{duration:0.3}}
                                style={{
                                    height:24,
                                    width:24,
                                    position:"absolute",
                                    zIndex:10,
                                    right:0,
                                    top:0
                                }}>
                                     <img className="svg-like-ready" src={Acitve} alt="svgActive" /> 

                                </motion.button>
                                }
                            
                        </AnimatePresence>
                    </div>
                    }

                    
                    <Link to={`/productpage/${product_id}/${productPath}/${nameEn}`} className="wrapper-tover--ref">
                        <div className="img-tover-center">
                            <img className="img-tovar" width="300" height="300" src={main_image} alt={name} loading="lazy" itemProp="image"/>
                        </div>
                        <div className="cart--descr">
                            <p className="tovar--opisane" itemProp="name">{name}</p>
                        </div>
                    </Link>
                </div>

                <div className="container-art-cost">
                    <p className="text-art">{sku}</p>
                    <div className="text-cost">
                        <span itemProp="price">{Math.round(Number(final_price)).toLocaleString('ru')}₽</span>
                        <meta itemProp="priceCurrency" content="RUB"/>
                        {saleNumber != 0 &&  <div className="old-price">{Math.round(Number(price)).toLocaleString('ru')}₽</div>}
                    </div>
                </div>
            </article>
})


export default PorductCard
