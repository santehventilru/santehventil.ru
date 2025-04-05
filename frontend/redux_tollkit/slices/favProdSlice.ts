import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { ProductsFavCart } from '@shared/type';

interface FavPr{
    favCount:number,
    favUpdate:boolean,
    favProducts:number[],
    favStatus:boolean,
    favProductsArr:ProductsFavCart[]
}

const initialState: FavPr = {
    favCount:0,
    favUpdate:false, 
    favProducts:[],
    favProductsArr:[],
    favStatus:false
}

const favProductsSlice  = createSlice({
    name:'favProductsSlice',
    initialState,
    reducers:{
        addToFav: (state, action: PayloadAction<{ prod: ProductsFavCart[] }>) => {
            const { prod } = action.payload;
            state.favProductsArr = prod
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