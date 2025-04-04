import brandsSlice from './brandsSlice'
import cartSlice from './cartSlice'
import createOrderSLice from './orderSlice'
import searchSlice from './searchSlice'
import favProductsSlice from './favProdSlice'
import categorTabsSlice from './categorySlice'
import making from './makingSlice/index'
import charFilterSlice from './filterSlice/charFilterSlice'
import charLoginSlice from './logRegSlice/loginRegSlice'
import windowsSlice from './windowsSlice'
import catalogSlice from './catalogSlice'
const {makkingAdressForm, makkingProductForm, makingCheckValid, makkingPasswordForm, makingFormControllSlice} = making


const slices = {
    brandsSlice,
    cartSlice,
    createOrderSLice,
    searchSlice,
    favProductsSlice,
    categorTabsSlice,
    charFilterSlice,
    charLoginSlice,
    makkingAdressForm,
    makkingProductForm, 
    makingCheckValid,
    makkingPasswordForm,
    makingFormControllSlice ,
    windowsSlice,
    catalogSlice
}

export default slices
