import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    windowSize: 0
}

const windowsSlice = createSlice({
    name:'windowsSlice',
    initialState,
    reducers:({
        setWindowsSize:(state, action) => {
            state.windowSize = action.payload
        }
    })
})

export const  {setWindowsSize} = windowsSlice.actions
export default windowsSlice