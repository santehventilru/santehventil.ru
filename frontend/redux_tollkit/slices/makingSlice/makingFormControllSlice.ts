import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userStep:true,
    userValid:false
}

const makingFormControllSlice = createSlice({
    name:'makingFormControllSlice',
    initialState,
    reducers:{
        setUserStep:(state, action) => {
            state.userStep = action.payload
        },
        setUserValid:(state, action) => {
            state.userValid = action.payload
        }
    }
})

export const {setUserStep, setUserValid} = makingFormControllSlice.actions

export default makingFormControllSlice