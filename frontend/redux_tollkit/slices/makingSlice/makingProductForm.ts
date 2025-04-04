import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    productStep:false,
    productValid:false,
}

const makkingProductForm  = createSlice({
    name:'makkingProductForm', 
    initialState,
    reducers:{
        setProductStep:(state, action) => {
            state.productStep= action.payload
        },
        setProductValid:(state, action) => {
            state.productValid = action.payload
        }
    }
})

export const {setProductStep,setProductValid} = makkingProductForm.actions

export default makkingProductForm