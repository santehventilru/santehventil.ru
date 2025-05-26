import {createSlice} from '@reduxjs/toolkit'

interface Payload {
    [key: string]: string ;
}

const initialState = {
    orderInfo:{
        delivery_type:'',
        delivery_address:'',
        phone:'',
        payment:'',
        status:'',
    }
}

const createOrderSLice = createSlice({
    name:'createOrderSLice',
    initialState,
    reducers:{
        setOrderInfo: (state, action: { payload: Payload }) => {
            Object.entries(action.payload).forEach(([key, value]) => {
                if (value !== undefined && key !== null) {
                    state.orderInfo[key as keyof typeof state.orderInfo] = value;
                }
            });
        }
        
    }
})

export const {setOrderInfo} = createOrderSLice.actions

export default createOrderSLice