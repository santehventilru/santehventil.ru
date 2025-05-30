import {createSlice} from "@reduxjs/toolkit"
import { ProductsFavCart } from "@shared/type"


interface cartInterFace{
    cartCount: number,
    productsID:number[],
    cartStatus:boolean
    products:ProductsFavCart[]
    
}

const initialState : cartInterFace = {
    cartCount:0,
    productsID:[],
    cartStatus:false,
    products:[]
}

const cartSLice = createSlice({
    name:'cartSLice',
    initialState,
    reducers:{
        plusCartCount:(state) => {
            state.cartCount +=1
        },
        minusCartItem:(state) => {
            if(state.cartCount > 0){
                state.cartCount -= 1
            }
        },
        setCartCount:(state, action) => {
            state.cartCount = action.payload
        },
        deleteProduct:(state, action) => {
            const index = state.productsID.findIndex(id => id === action.payload); // Ищем индекс товара по его ID
            if (index !== -1) {  // Если товар найден
                state.productsID.splice(index, 1);  // Удаляем товар из массива
            }
        },
        setProductsID: (state, action) => {
            if (!state.productsID.includes(action.payload)) {
                state.productsID.push(action.payload); 
            }
        },
        setChangeCartStatus:(state, action) => {
            state.cartStatus = action.payload
        },
        setToogleCart:(state) => {
            state.cartStatus = !state.cartStatus
        }

    }
})

export const {plusCartCount, minusCartItem, setCartCount, deleteProduct ,
     setProductsID, setChangeCartStatus, setToogleCart} = cartSLice.actions

export default cartSLice