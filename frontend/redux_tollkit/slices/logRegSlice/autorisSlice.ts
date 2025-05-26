import { orderInterFace, UserInfo } from "@pages/AccPage/Windows/pages/type"
import {createSlice} from "@reduxjs/toolkit"

interface initialInterface{
    autorisStatus:boolean
    changeEvent:boolean
    userInfo:UserInfo
    userOrdersClosed:orderInterFace[]
    userOrderCurrenet:orderInterFace[]
}

const initialState : initialInterface = {
    autorisStatus: false,
    // role:'',
    userInfo:{},
    userOrdersClosed:[],
    userOrderCurrenet:[],
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
        },
        setUserInfo:(st, ac) => {
            st.userInfo = {...ac.payload}
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

export const  {setStatus,  setChange, setUserInfo} = autoriseSlice.actions

export default autoriseSlice