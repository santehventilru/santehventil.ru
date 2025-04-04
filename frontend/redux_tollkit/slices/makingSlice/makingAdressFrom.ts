import { createSlice } from "@reduxjs/toolkit";

interface deliveMet {
    addressStep:boolean,
    addressValid:boolean,
    deliveryMethod:string,
    status:string,

}

const initialState : deliveMet = {
    addressStep:false,
    addressValid:false,
    deliveryMethod: "Courier",
    status:''
    
}

const makkingAdressForm  = createSlice({
    name:'makkingAdressForm', 
    initialState,
    reducers:{
        setAddressStep:(state, action) => {
            state.addressStep= action.payload
        },
        setAddressValid:(state, action) => {
            state.addressValid = action.payload
        },
        changeDelivery:(state, action) =>{
            let status  = action.payload
            const  collection = new Set(["SelfCall", "Courier", "TransferLine", 'Express']) 
            if(collection.has(status)){
                state.deliveryMethod = action.payload
            }
            
            
        }
    }
})

export const {setAddressStep,setAddressValid, changeDelivery} = makkingAdressForm.actions

export default makkingAdressForm