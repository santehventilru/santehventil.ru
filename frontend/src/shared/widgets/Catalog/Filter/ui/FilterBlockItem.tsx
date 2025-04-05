import React from "react";import { useDispatch, useSelector} from "react-redux";
import { setFilters} from '@toolkit/slices/filterSlice/charFilterSlice'
import { motion } from 'framer-motion'
import { RootState } from "redux_tollkit/store/store";
import { FilterItemInterface } from "../type";

interface FilterAtr{
    attribute:string,
    values:string[]
}

const  FilterBlockItem = React.memo(({value , product_count, attribut}: FilterItemInterface) => {
    
    
    const filtres = useSelector((state:RootState) => state.charFilterSlice.selectedFilters)
    const dispatch = useDispatch()

    const handelClick = () =>{
        dispatch(setFilters({attribut, value}))

    }

    const status = filtres.reduce((acc:boolean, item:FilterAtr) => {
        if(item.attribute === attribut && item.values.includes(value)){
            acc = true
        }
        return acc
    }, false)




    return <motion.li className="characteristic-list-item" onClick={handelClick}
    animate={{backgroundColor: status ? 'rgb(129, 104, 161)': '#0D1115', borderRadius:  status ? 15 : 0 , }}
    transition={{duration:0.3}}
    >
    <div className="characteristic-name">{value}</div>
    <div className="characteristic-count">({product_count})</div>
</motion.li>
})

export default FilterBlockItem