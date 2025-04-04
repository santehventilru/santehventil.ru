import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    passwordStep:false,
    passwordValid:false
}

const makkingPasswordForm  = createSlice({
    name:'makkingPasswordForm', 
    initialState,
    reducers:{
        setPasswordStep:(state, action) => {
            state.passwordStep= action.payload
        },
        setPasswordValid:(state, action) => {
            state.passwordValid = action.payload
        }
    }
})

export const {setPasswordStep, setPasswordValid} = makkingPasswordForm.actions

export default makkingPasswordForm