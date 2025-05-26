
import { useLocation, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import FilterBlock from '../ui/FilterBlock';
import {  motion } from 'framer-motion';
import { parseCategoryPath } from '@shared/utils/ParseCategoryPath';
import BtnFilterApply from '../ui/BtnFilterApply';
import BtnFilterReset from '../ui/BtnFilteReset';
import { Slider } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { updatePriceFilter} from "@toolkit/slices/filterSlice/charFilterSlice"
import { AppDispatch, RootState } from '@toolkit/store/store';
import Api from '@api/apiService';
import { FilterBlockInterface, FilterItemInterface, FiltersArrInterface } from "../type";


interface AttList{
    attributsList: FilterBlockInterface[]
}

export default function FilterProduct(){

    const [values, setValues] = useState<[number, number]>([0,0])
    const [min , setMin] = useState<number>(0)
    const [max,setMax] = useState<number>(1)
    const [attributs , setAttributs] = useState<FilterBlockInterface[]>()
    const location = useLocation().pathname
    const NoFilterAtribute  = [8, 5, 194,165, 313, 171]
    const dispatch = useDispatch<AppDispatch>()
    const {name} = useParams()
    const brandID = name?.split('-')[0]
    


    const filterPrice  = useSelector((state:RootState) => state.charFilterSlice.selectedFilters)
    .find((f:FiltersArrInterface)=> f.attribute === "price")
    
    
    useEffect(() => {
        
        setValues([0,0])
        setAttributs([])
        const categoryIds = parseCategoryPath(location);  
        const categoryId = categoryIds[categoryIds.length - 1];


        const urls  = {
            brand: `/api/brand/attribute/${brandID}?categoryPath=${categoryId || ''}`,
            def: `/api/attribute/${categoryId}`
        }
        
        if(!NoFilterAtribute.includes(categoryId)){
            Api.get<AttList>(brandID ? urls.brand : urls.def)
            .then((res) => {
                const transformedAttributes =  Object.entries(res).map(([key, value]) => ({
                    attribut: key,
                    filetBlockList: Array.isArray(value) ? value as FilterItemInterface[] : [],
                }));
                console.log(res)
                setAttributs(transformedAttributes)
            }).catch((err) => {
                console.error(err)
            })
        }else{
            setAttributs([])
        }
        Api.get<any>(`/api/categoriesInfo?categoryPath=${encodeURIComponent(location || '')}`)
        .then((res) => {
            const min_price = Math.round(res.result[0].min_price) || 0
            const max_price = Math.round(res.result[0].max_price) || 0
            setMin(min_price)
            setMax(max_price)            
            setValues([min_price, max_price])
        }).catch((err) => {
            console.error(err)
        })
    },[location])

    const handleChange = (_event: Event, newValues: number | number[], _activeThumb: number) => {
            if (Array.isArray(newValues)) {
                console.log(newValues)
            setValues([newValues[0], newValues[1]]);
            dispatch(updatePriceFilter(newValues))
            }

    };

    const handleChangeCommitted = (
            _event: React.SyntheticEvent | Event,
            newValues: number | number[],
          ) => {
            if (Array.isArray(newValues)) {
            }
    };


    return <>
            <motion.div id="filter-des-wp"
            animate = {{height: 'auto'}}
            transition={{duration:0.3}}
            >

                <div className="filter-wp" id="filter-content">


                        <div className="filter-scroll-wp" id="FiterScroll">
                            <h3 className="haeding-filter" id="PriceFilter">Цена</h3>
                            <div className="filter-scroll-content-wp">
                                <div className="controller-wp">
                                
                                <Slider
                                    value={filterPrice?.values || values}
                                    onChange={handleChange}
                                    onChangeCommitted={handleChangeCommitted}
                                    valueLabelDisplay="auto"
                                    min={min}
                                    max={max}
                                    step={100}
                                    sx={{
                                        color: "rgba(117, 135, 248, 0.863)",
                                        height: 4,
                                        "& .MuiSlider-thumb": {
                                        backgroundColor: "white",
                                        border: "2px solid rgba(117, 135, 248, 0.863)",
                                        },
                                        "& .MuiSlider-track": {
                                        backgroundColor: "rgba(117, 135, 248, 0.863)",
                                        },
                                        position:'static',
                                       
                                    }}
                                    />
                                
                                </div>
                                
                                <div className="price-wp">
                                    <p className="price-filter-text">Цена:</p>
                                    <span className="filter-price-min">{
                                    filterPrice?.values[0] &&  filterPrice?.values[0].toLocaleString('ru')
                                    || 
                                    values[0] && values[0].toLocaleString('ru')
                                    }₽</span>
                                    <span className="tire">-</span>
                                    <span className="filter-price-max">{
                                    filterPrice?.values[1] &&  filterPrice?.values[1].toLocaleString('ru')
                                    || 
                                    values[1] && values[1].toLocaleString('ru')
                                    }₽</span>
                                </div>
                                <div className="button-filter-wp">
                                    <BtnFilterApply/>
                                    <BtnFilterReset/>
                                </div>
                            </div>
                        </div>    

                        {attributs && attributs.length > 0  && attributs.map((blockFilter) => {  
                            if(blockFilter.filetBlockList.length > 2){
                                return <FilterBlock key={blockFilter.attribut} {...blockFilter}/> 
                            }
                            
                        })} 
                    
                    
                </div>
            </motion.div>

            
        </>
  }