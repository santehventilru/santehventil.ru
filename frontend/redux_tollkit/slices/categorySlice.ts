import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    activeTabs : 'acc'
}
const categorTabsSlice = createSlice({
    name:'categorTabsSlice',
    initialState,
    reducers:{
        setActiveTabs:(state, action) => {
            state.activeTabs = action.payload
        }
    }

})

export const {setActiveTabs} = categorTabsSlice.actions

export default categorTabsSlice