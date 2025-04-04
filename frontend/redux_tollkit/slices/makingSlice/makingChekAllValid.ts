import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allValid:false,
    paymentMehtod: "Card",
    
}

const makingCheckValid = createSlice({
    name:'makingCheckValid',
    initialState,
    reducers:{
        setValidAll:(state, action) => {
            state.allValid = action.payload
        },
        changePayment:(state, action) =>{
            state.paymentMehtod  = action.payload
        }

    }
})

export const {setValidAll, changePayment} = makingCheckValid.actions

export default makingCheckValid