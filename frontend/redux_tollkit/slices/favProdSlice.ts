import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface FavPr{
    favCount:number,
    favUpdate:boolean,
    favProducts:number[],
    favStatus:boolean,
}

const initialState: FavPr = {
    favCount:0,
    favUpdate:false, 
    favProducts:[],
    favStatus:false
}

const favProductsSlice  = createSlice({
    name:'favProductsSlice',
    initialState,
    reducers:{
        addToFav: (state, action: PayloadAction<{ prod: { product_id: number }[] }>) => {
            const { prod } = action.payload;
 
            const newProductIds = prod.map(product => product.product_id)
            .filter(id => typeof id === "number" && Number.isFinite(id));

            state.favProducts = newProductIds;
        },
        plusFavActive:(state) => {
            state.favUpdate  = true
        },
        minusFavPassive:(state) => {
            state.favUpdate  = false
        },
        setFavCount:(state, action) => {
            state.favCount = action.payload
        },
        setToogleFav:(state) => {
            state.favStatus = !state.favStatus
        }

        
    }
})

export const {addToFav, plusFavActive, minusFavPassive, setFavCount, setToogleFav}  =  favProductsSlice.actions

export default favProductsSlice