import {createSlice, PayloadAction,} from '@reduxjs/toolkit'
import { ProductCard } from 'src/types/interface'


interface catalogSliceInterface{
    products: ProductCard[],
    offset:number,
    visibleProducts: ProductCard[],
    bufferProducts: ProductCard[],
    bufferSize:number,
    offsetSlice:number,
    lastBackTime: number, 
}

const initialState: catalogSliceInterface = {
    products:[],
    offset:0,
    visibleProducts:[],
    bufferProducts:[],
    bufferSize:32,
    offsetSlice:0,
    lastBackTime: 0, 
}

const catalogSlice = createSlice({
    name:'catalogSlice',
    initialState,
    reducers:({
        resetProducts:(state) => {
            state.offset = 0
            state.products = []
            state.visibleProducts = []
        },
        setProducts: (state, action: PayloadAction<ProductCard[]>) => {
            if (state.offset === state.offsetSlice) {
                // console.log('Подгрузка из API');
                const newProducts = action.payload;
                state.products = [...state.products, ...newProducts];
                state.offset += newProducts.length;
                state.offsetSlice = state.offset;

                // Всегда ограничиваем видимые продукты bufferSize
                const startIndex = Math.max(0, state.products.length - state.bufferSize);
                state.visibleProducts = state.products.slice(startIndex);
                state.bufferProducts = state.products.slice(0, startIndex);
            } else {
                // console.log('Прокрутка из буфера');
                state.offsetSlice = Math.min(state.offset, state.offsetSlice + 16);
                
                const startIndex = Math.max(0, state.offsetSlice - state.bufferSize);
                state.visibleProducts = state.products.slice(
                    startIndex, 
                    startIndex + state.bufferSize
                );
                state.bufferProducts = state.products.slice(0, startIndex);
            }

            // console.log('Видимые продукты:', state.visibleProducts.length, '/', state.bufferSize);
            // console.log('Буфер продуктов:', state.bufferProducts.length);
            // console.log('Общий offset:', state.offset);
        },
        
        backProduct: (state) => {
            // const currentTime = Date.now();
            // const delayTime = 50; // 500 миллисекунд (можно подстроить по необходимости)

            // Если прошло достаточно времени с последней операции возврата, начинаем обработку
            // if (currentTime - state.lastBackTime > delayTime) {
                if (state.bufferProducts.length === 0) {
                    console.log('Нет продуктов для возврата');
                    return;
                }

                const returnCount = Math.min(16, state.bufferProducts.length);
                state.offsetSlice = Math.max(0, state.offsetSlice - returnCount);

                const newStartIndex = Math.max(0, state.offsetSlice - state.bufferSize);

                state.visibleProducts = [
                    ...state.bufferProducts.slice(-returnCount),
                    ...state.visibleProducts.slice(0, state.bufferSize - returnCount),
                ];
                
                state.bufferProducts = state.products.slice(0, newStartIndex);

                // Обновляем время последнего возврата
                // state.lastBackTime = currentTime;
                console.log('Продуктов в буфере', state.bufferProducts.length)
                console.log('Возвращено продуктов:', returnCount);
                console.log('Новые видимые продукты:', state.visibleProducts.length);
            //}
        },

    })

})

export const {setProducts, resetProducts, backProduct} = catalogSlice.actions

export default catalogSlice