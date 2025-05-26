import {createSlice,} from '@reduxjs/toolkit'


import { ProductCardInterface } from "@shared/widgets/Catalog/CatalogScroll/types";



interface catalogSliceInterface{
    offset:number,
    visibleProducts: ProductCardInterface[],
    cartRowCount:number
}

const initialState: catalogSliceInterface = {
    offset:0,
    visibleProducts:[],
    cartRowCount:0,
}

const catalogSlice = createSlice({
    name:'catalogSlice',
    initialState,
    reducers:({
        resetProducts:(state) => {
            state.offset = 0
            state.visibleProducts = []
        },
        setProducts:(state, action) => {
            // const res  = findProductDuplicates(action.payload)
            // console.log('Продукты на вход', res)
            state.visibleProducts = [...state.visibleProducts, ...action.payload]
            // const rer2 = findProductDuplicates(state.visibleProducts)
            // console.log('Продукты после проебразования',rer2)
            state.offset +=12
        },
        setCartRowCount:(state, action) => {
            if(action.payload > 1199){
                state.cartRowCount = 4
            }else if(action.payload > 750 && action.payload <= 1199){
                state.cartRowCount = 3
            }else{
                state.cartRowCount = 2
            }
            
        }
        // setProducts: (state, action: PayloadAction<ProductCard[]>) => {
        //     if (state.offset === state.offsetSlice) {
        //         // console.log('Подгрузка из API');
        //         const newProducts = action.payload;
        //         state.products = [...state.products, ...newProducts];
        //         state.offset += newProducts.length;
        //         state.offsetSlice = state.offset;

        //         // Всегда ограничиваем видимые продукты bufferSize
        //         const startIndex = Math.max(0, state.products.length - state.bufferSize);
        //         state.visibleProducts = state.products.slice(startIndex);
        //         state.bufferProducts = state.products.slice(0, startIndex);
        //     } else {
        //         // console.log('Прокрутка из буфера');
        //         state.offsetSlice = Math.min(state.offset, state.offsetSlice + 16);
                
        //         const startIndex = Math.max(0, state.offsetSlice - state.bufferSize);
        //         state.visibleProducts = state.products.slice(
        //             startIndex, 
        //             startIndex + state.bufferSize
        //         );
        //         state.bufferProducts = state.products.slice(0, startIndex);
                
        //     }
        //     console.log(state.products.length)
        //     // console.log('Видимые продукты:', state.visibleProducts.length, '/', state.bufferSize);
        //     // console.log('Буфер продуктов:', state.bufferProducts.length);
        //     // console.log('Общий offset:', state.offset);
        // },
        
        // backProduct: (state) => {
            
        //         if (state.bufferProducts.length === 0) {
        //             console.log('Нет продуктов для возврата');
        //             return;
        //         }

        //         const returnCount = Math.min(54, state.bufferProducts.length);
        //         state.offsetSlice = Math.max(0, state.offsetSlice - returnCount);

        //         const newStartIndex = Math.max(0, state.offsetSlice - state.bufferSize);

        //         state.visibleProducts = [
        //             ...state.bufferProducts.slice(-returnCount),
        //             ...state.visibleProducts
        //             // ...state.visibleProducts.slice(0, state.bufferSize - returnCount)
        //         ];
                
        //         state.visibleProducts = [
        //             ...state.visibleProducts.slice(0, state.bufferSize - returnCount)  
        //         ] 
                
                
                
        //         state.bufferProducts = state.products.slice(0, newStartIndex);

        //         console.log('Продуктов в буфере', state.bufferProducts.length)
        //         console.log('Возвращено продуктов:', returnCount);
        //         console.log('Новые видимые продукты:', state.visibleProducts.length);
        //         console.log(state.products.length)
            
        // },
        // setCatalogSize:(state, action) => {
        //     state.catalogSize = action.payload
        // }

    })

})

export const {resetProducts, setProducts, setCartRowCount} = catalogSlice.actions

export default catalogSlice