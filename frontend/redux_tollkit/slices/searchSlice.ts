import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    shearchStatus:false,
    searchQuery:''
}

const shearchSlice = createSlice({
    name:'shearchSlice',
    initialState,
    reducers:{
        changeStatus:(state, action) => {
            state.shearchStatus = action.payload
        },
        setSearchQuery:(state, action) => {
            state.searchQuery = action.payload
        }
    }
})


export const {changeStatus,setSearchQuery} = shearchSlice.actions

export default shearchSlice