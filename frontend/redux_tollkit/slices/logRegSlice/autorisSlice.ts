import {createSlice} from "@reduxjs/toolkit"



const initialState = {
    autorisStatus: false,
    // role:'',
    // userInfo:[],
    changeEvent:false

}

const autoriseSlice  = createSlice({
    name:'autoriseSlice', 
    initialState, 
    reducers:{
        // setAutoris:(state, action) => {
        //     state.autorisStatus = action.payload
        // },
        // setUserInfo:(state, action) => {
        //     state.userInfo = action.payload
        // },
        // unsetUserInfo:(state) => {
        //     state.userInfo = []
        // },
        setChange:(st, ac) => {
            st.changeEvent = ac.payload
        },
        setStatus:(st, ac) => {
            st.autorisStatus = ac.payload
        }
        // updateUser:(state) => {
        //     // const [key, value] = action.payload
        //     console.log(state.userInfo)
        // },
        // setRole:(state, action) => {
        //     state.role = action.payload
        // }

    }
})

export const  {setStatus,  setChange} = autoriseSlice.actions

export default autoriseSlice