import {AnimatePresence, motion} from 'framer-motion'
import { RewNoLogin, RewAdd } from "@shared/widgets/Rew/Rew_section"
import RewCard from "@shared/widgets/Rew/ui/RewCard"
import PorductDescr from "../ui/ProductDescr"
import clsx from "clsx"
import AttributeItem from "../ui/AtroibuteItem"
import LaylotyBox from "@shared/ui/LaylotyBox"
import { useState } from 'react'
import { AttributeProduct, PorductFromProdPage } from '../type'
import { RewCardInterface } from '@shared/type'

interface TabsProps{
    product:PorductFromProdPage | null
    atr:AttributeProduct[] | null
    loginStatus:boolean
    rews:RewCardInterface[]
}

export default function Tabs({loginStatus, product ,atr, rews}:TabsProps){
    const [activeTab, setActiveTab] = useState<"descr" | "char" | "rew">("descr");
    const [modal, setModal] = useState<boolean>(false)
    const [rewAdd, setRewAdd] = useState<boolean>(false)

    const handelClick = () => {
        if(loginStatus){
            setRewAdd(true)
        }else{
            setModal(true)
        }
    }

    const closeModal = () => {
        setModal(false)
        setRewAdd(false)
    }

    return <div className="tabs-prod-wp">
                    <div className="tabs-pers-info-wp" style={{ margin:'0 10px 10px'}}>
                        <button
                            className={clsx("btn-tabs-persAcc-wp", {
                                "btn-tabs-persAcc-wp-active": activeTab === "descr",
                            })}
                            onClick={() => setActiveTab("descr")}
                        >
                            Описание
                        </button>
                        <button
                            className={clsx("btn-tabs-persAcc-wp", {
                                "btn-tabs-persAcc-wp-active": activeTab === "char",
                            })}
                            onClick={() => setActiveTab("char")}
                        >
                            Характеристики
                        </button>
                        <button
                            className={clsx("btn-tabs-persAcc-wp", {
                                "btn-tabs-persAcc-wp-active": activeTab === "rew",
                            })}
                            onClick={() => setActiveTab("rew")}
                        >
                            Отзывы
                        </button>
                    </div>
                        <div className="tabs-content-wp ">
                            <AnimatePresence mode="wait">
                                <motion.div className="tabs-panel tabs-panel-text tabs-flex tabs-panel--active" data-index="0"  id="OpisContent"
                                key={activeTab}
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 100 }}
                                >
                            
    
                                
                                    {activeTab === "descr" && 
    
                                    <div className="tabs-panel-text-box"
                                    
                                    >
                                        {product &&  product.description !== 'Описание не найдено'  ?  <PorductDescr description={product.description}/> : 'У товара отуствует описание'} 
                                    </div>
                                    
                                    }
                                    {activeTab === "char" && 
                                    
                                    <div className="tabs-panel-text-box text-box-characteristics" id="charList">
                                        {atr && atr.map(attribute => <AttributeItem key={attribute.attribute_name}  {...attribute}/>)}
                                    </div>
    
                                    }
                                    {activeTab === "rew" && 
                                    
                                    <div className="wp-rev-product">
                                        <div className={` ${rews.length === 0 ?  'no-rew-item-wp':"reviews-wrapper rev-wp-product-page" }`}>
                                           {rews.length > 0 ? rews.map((rew, index) => <RewCard key={String(index)+ rew.login} {...rew}/>) : <div>Нет отзывов</div>}
                                            
                                        </div>
                                        <div className="flex-left">
                                            <button className="rew-open" onClick={handelClick}>
                                                <p>Оствавить отзыв</p>
                        
                                                <svg className="svg-rew" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path id="xui" fillRule="evenodd" clipRule="evenodd" d="M24 24V19L39 4L44 9L29 24H24Z" fill="#F6D863" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M16 24H9C6.23858 24 4 26.2386 4 29C4 31.7614 6.23858 34 9 34H39C41.7614 34 44 36.2386 44 39C44 41.7614 41.7614 44 39 44H18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                    
                                            </button>
                                        </div>
                                        {modal && <RewNoLogin closeModal={closeModal}/>}
                                        {rewAdd && <RewAdd setRewAdd ={setRewAdd} closeModal={closeModal}/>}
                                    </div>
                                    
                                    }
                                    <LaylotyBox style={{}}/>
                                </motion.div>
                            </AnimatePresence>
    
                        </div>
                    </div>
}