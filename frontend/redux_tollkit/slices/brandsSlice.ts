import {createSlice} from "@reduxjs/toolkit"



const initialState = {
    brands:[]
}

const brandsSlice = createSlice({
    name:'brandsSlice',
    initialState,
    reducers:{
        setBrandsInfo:(state, action) => {
            state.brands = action.payload
        }
    }
})

export const {setBrandsInfo} = brandsSlice.actions

export default brandsSlice