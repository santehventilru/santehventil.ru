import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    loginOpen:false,
    registerOpen:false,
    loginRegWpState:false,

}

const charLoginSlice = createSlice({
    name:'charLoginSlice', 
    initialState, 
    reducers:{
        setOpenLogin:(state) =>{
            state.registerOpen = false
            state.loginOpen = true
            state.loginRegWpState = true
        },
        setOpenRegister:(state) =>{
            state.loginOpen = false
            state.registerOpen = true
            state.loginRegWpState = true
        },
        setCloseModals:(state) => {
            state.loginOpen = false
            state.registerOpen = false
            state.loginRegWpState = false
        },
        
    }
})

export const  {setOpenLogin, setOpenRegister, setCloseModals} = charLoginSlice.actions

export default charLoginSlice