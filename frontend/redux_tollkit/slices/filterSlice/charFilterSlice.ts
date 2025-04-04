import {createSlice} from "@reduxjs/toolkit"
import { FiltersArrInterface } from "../../../src/types/interface";

const initialState ={
    path:'',
    selectedFilters: [] as FiltersArrInterface[], 
    filterActive: false,
    filterReset: false,
    minPrice: 0 ,
    maxPrice:0,
    windowSize:0,
    filterMobalWindow:false
    
}
const charFilterSlice = createSlice({
    name:'charFilterSlice',
    initialState, 
    reducers:{
        setFilters: (state, actions) => {
            const { attribut, value } = actions.payload;
            let updatedFilters = [...state.selectedFilters];
        
            // Ищем фильтр с заданным атрибутом
            const existingFilter = updatedFilters.find(f => f.attribute === attribut);
        
            if (existingFilter) {
                const valueIndex = existingFilter.values.indexOf(value);
                if (valueIndex !== -1) {
                    // Если значение существует, удаляем его
                    existingFilter.values = existingFilter.values.filter(v => v !== value);
        
                    // Если значения пусты, удаляем атрибут
                    if (existingFilter.values.length === 0) {
                        updatedFilters = updatedFilters.filter(f => f.attribute !== attribut);
                    }
                } else {
                    // Если значение не найдено, добавляем его
                    existingFilter.values = [...existingFilter.values, value];
                }
            } else {
                // Если фильтра с таким атрибутом нет, добавляем его
                updatedFilters.push({ attribute: attribut, values: [value] });
            }
        
            // Присваиваем новое состояние
            state.selectedFilters = updatedFilters;
        
            console.log(state.selectedFilters);
        },
        setPath: (state, actions) => {
            state.path = actions.payload
        },
        resetFilter:(state) => {
            state.selectedFilters = []
            state.filterActive = true
        },
        deactiveReset:(state) => {
            state.filterReset = false
        },
        setActive:(state, action) => {
            state.filterActive = action.payload
        }, 
        updatePriceFilter: (state, action) => {
            const minPrice = action.payload[0];
            const maxPrice = action.payload[1]
            const updatedFilters = [...state.selectedFilters];

            // Ищем фильтр по цене
            const priceFilter = updatedFilters.find(f => f.attribute === "price");

            if (minPrice == null && maxPrice == null) {
                // Удаляем фильтр "price", если оба значения пусты
                if (priceFilter) {
                    const filterIndex = updatedFilters.indexOf(priceFilter);
                    updatedFilters.splice(filterIndex, 1);
                }
            } else {
                // Если фильтр уже существует, обновляем его
                if (priceFilter) {
                    priceFilter.values = [minPrice, maxPrice];
                } else {
                    // Если фильтра нет, добавляем новый
                    updatedFilters.push({
                        attribute: "price",
                        values: [minPrice, maxPrice]
                    });
                }
            }

            // Обновляем состояние фильтров
            state.selectedFilters = updatedFilters;
        },
        newPageReset:(state) =>{
            state.selectedFilters.length = 0
        },
        setDefPriceMin:(state, action) => {
            state.minPrice  = action.payload
        },
        setDefPriceMax:(state, action) => {
            state.maxPrice = action.payload
        },
        setWindowSize:(state, action) => {
            state.windowSize = action.payload
        },
        setToogleMobalWindow:(state) => {
            state.filterMobalWindow = !state.filterMobalWindow
        }

    }
})


export const {setFilters, setPath, setActive, deactiveReset,
     resetFilter, updatePriceFilter,
      newPageReset, setWindowSize, setToogleMobalWindow}  = charFilterSlice.actions

export default charFilterSlice