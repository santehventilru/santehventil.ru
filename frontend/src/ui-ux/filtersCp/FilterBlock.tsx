import React, { useEffect, useRef, useState } from "react";
import { FilterBlockInterface, FilterItemInterface } from "../../types/interface";
import FilterBlockItem from "./FilterBlockItem";
import { motion} from 'framer-motion'






const  FilterBlock = React.memo(({attribut, filetBlockList}:FilterBlockInterface) => {


    const [isOpen , setIsOpen] = useState<boolean>(false)
    const [filterList , setFilterList] = useState<FilterItemInterface[]>()
    const [currentHeigth, setHeight] = useState<number>()
    const heightOfElemnt  = useRef<HTMLHeadingElement | null>(null)
    const [refrech, setRefresh] = useState<boolean>(true)

    const toggleHeight = () => {
        setIsOpen(prev => !prev);
    };


    useEffect(() => {
        setFilterList(filetBlockList);
        console.log(filetBlockList);
    
        if (heightOfElemnt.current) {
            const height = heightOfElemnt.current.getBoundingClientRect().height;
            console.log(height)
            if (height === 0) {
                // hasToggled.current = true;
                 // Помечаем, что уже переключали
                setRefresh(!refrech);
            } else {
                // hasToggled.current = false; // Сбрасываем флаг, если высота изменилась
            }
            setHeight(height)
        }
    }, [refrech]);

    // console.log('filter-block-render', heightOfElemnt.current)


    return <motion.div className="characteristic-wp" id={attribut} itemScope itemType="https://schema.org/DefinedTerm"

        initial={{ opacity:0}}
        animate={{ height: isOpen ? 'auto' : currentHeigth, opacity:1 }} 
        transition={{ duration: 0.3 }} 
        style={{ overflow: 'hidden' }} 
        >
    
        <meta itemProp="name" content={attribut}/>
        <meta itemProp="description" content={`Фильтр характеристик товаров, относящихся к ${attribut}`}/>

        <div className="filter-name-cont" onClick={toggleHeight}>
            {/* <svg className="filter-mob-gear" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.763 13.7944L20.029 16.0222C19.8786 16.3163 19.7105 16.6051 19.5244 16.8873C19.3383 17.1695 19.1391 17.4378 18.9281 17.6919L16.4377 17.4142C15.7715 17.9608 15.0027 18.3869 14.1645 18.6592L13.0002 20.945C12.6719 20.9813 12.3382 21 12.0002 21C11.6622 21 11.3285 20.9813 11.0002 20.945L9.83293 18.6582C8.99428 18.3854 8.22514 17.9585 7.5589 17.4111L5.05407 17.6915C4.84303 17.4374 4.64381 17.1691 4.45774 16.8869C4.27168 16.6047 4.10356 16.3159 3.95312 16.0218L5.22637 13.7814C5.07803 13.2142 5.00021 12.6139 5.00021 12.0002C5.00021 11.3749 5.08219 10.7688 5.23599 10.192L3.95351 7.936C4.10394 7.64191 4.27206 7.3531 4.45812 7.07091C4.64419 6.78873 4.84341 6.52043 5.05445 6.2663L7.60942 6.55327C8.26776 6.02075 9.01625 5.60683 9.84 5.33984M9.83614 5.33996L11 3.05493C11.3283 3.01863 11.662 3 12 3C12.338 3 12.6716 3.01863 13 3.05493L14.1638 5.33996C14.9882 5.60716 15.7389 6.01764 16.3976 6.55077L18.9275 6.26661C19.1385 6.52074 19.3377 6.78904 19.5238 7.07123C19.7098 7.35341 19.878 7.64223 20.0284 7.93632L18.7592 10.1697M18.7594 10.1732C18.9164 10.7556 19.0002 11.3681 19.0002 12.0002C19.0002 12.6215 18.9193 13.2239 18.7673 13.7974M15.0002 12.0002C15.0002 13.657 13.6571 15.0002 12.0002 15.0002C10.3433 15.0002 9.0002 13.657 9.0002 12.0002C9.0002 10.3433 10.3433 9.00015 12.0002 9.00015C13.6571 9.00015 15.0002 10.3433 15.0002 12.0002Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g>
            </svg> */}

            <h3 className="heading-filter" ref={heightOfElemnt}  itemProp="name">{attribut}</h3>

            <svg className="svg-filter-item" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#bdbdbd">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.08884 14.7055C5.26942 14.2784 5.69482 14 6.16669 14H9V3C9 2.44772 9.44772 2 10 2H14C14.5523 2 15 2.44772 15 3V14H17.8333C18.3052 14 18.7306 14.2784 18.9112 14.7055C19.0917 15.1326 18.9919 15.6241 18.6583 15.951L12.825 21.6653C12.3693 22.1116 11.6307 22.1116 11.175 21.6653L5.34174 15.951C5.00808 15.6241 4.90826 15.1326 5.08884 14.7055Z" ></path> </g>
            </svg>
        </div>

        <ul className="characteristic-list-item--wp" itemProp="termCode">
            {isOpen &&  filterList && filterList.map((filtersItems) => {return <FilterBlockItem key={filtersItems.value + filtersItems.product_count} {...filtersItems} attribut={attribut}/>})}
        </ul>
    </motion.div>
})

export default FilterBlock