import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './normalize.css'
import './App.css'
import Footer from './funcCp/Footer'
import ModalCart from './funcCp/ModalCart'
import LoginRegWp from './funcCp/LoginRegWp'
import {  useSelector } from 'react-redux'
import ProtectedUser from './routes/ProtectedRoutes/ProtectedUser'
import ProtectedAdmin from './routes/ProtectedRoutes/ProtectedAdmin'
import {  RootState } from '../redux_tollkit/store/store'
import FavModal from './funcCp/FavModa'
import Loader from '../src/funcHelper/Loader';
import ScrollTopRender from './funcHelper/ScrollTopRender';
import ScrollUp from './funcHelper/ScrollUp';
import {ToastContainer} from 'react-toastify'
import WindowsSizeObserver from './funcHelper/WindowsSizeObserver';
import HeaderWrapper from './ui-ux/HeaderCp/HeaderWrapper';
import FavCardBtn from './ui-ux/CartCp/FavCartBtn';




// Ленивая загрузка компонентов
const Home = React.lazy(() => import('./funcCp/Home'));
const CatalogPage = React.lazy(() => import('./funcCp/Catalog'));
const ShippingInformation = React.lazy(() => import('./funcCp/ShippingInformation'));
const ContacsPage = React.lazy(() => import('./funcCp/Contacts'));
const MakingPage = React.lazy(() => import('./funcCp/MakingPage'));
const ProductPage = React.lazy(() => import('./funcCp/ProductPage'));
const PersAccUser = React.lazy(() => import('./funcCp/PersAccUser'));
const PersAccAdmin = React.lazy(() => import('./funcCp/PersAccAdmin'));
const Page404 = React.lazy(() => import('./funcCp/Page404'));
const SearchPage = React.lazy(() => import('./funcCp/Search'))
const BrandPage = lazy(() => import('./funcCp/BrandPage'))
const Article1 = lazy(()=> import('./acrticlePages/Acrticle1'))
const Article2 = lazy(()=> import('./acrticlePages/Article2'))
const Article3 = lazy(()=> import('./acrticlePages/Article3'))
const Article4 = lazy(()=> import('./acrticlePages/Article4'))
const LoytuPage = lazy(() => import('./acrticlePages/LouytPage'))
const BrandCatalog = lazy(() => import('./funcCp/BrandCatalog'))
const OrdersMain = lazy(() => import('./ui-ux/Admin/OrdersMain'))
const SearchCatalog = lazy(() => import('./funcCp/SearchCatalog'))





function App() {

 
  const stateWpLoginReg = useSelector((state:RootState) => state.charLoginSlice.loginRegWpState)


  return (
    
      <BrowserRouter>

        {/* hellper */}
        <WindowsSizeObserver/>
        <ScrollTopRender/>
        <ScrollUp/>
        <FavCardBtn/>

        {/* headers */}
        <HeaderWrapper/>

        {/* modalWindows */}
        <ModalCart />
        <FavModal/>

        <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className={'custom-toast-container'}
        />

        {stateWpLoginReg && <LoginRegWp/>}
        <AppRoots/>

        
        <Footer/>
       
      </BrowserRouter>
   
  )
}

export default App



export const AppRoots = () => {
  return <Suspense fallback={<Loader/>}>
  <Routes>
    <Route path='/'  element={<Home/>}/>
    <Route path='/product/:catalog/*' element={<CatalogPage/>}/>
    <Route path='/shippingInformation' element={<ShippingInformation/>}/>
    <Route path='/contats' element={<ContacsPage/>}/>
    <Route path='/making_order' element={<MakingPage/>}/>
    <Route path='/productpage/:id/*' element={<ProductPage/>}/>
    <Route path='/search' element={<SearchPage/>}/>
    <Route path='/brand' element={<BrandPage/>}/>
    <Route path='/loyaltyProg' element={<LoytuPage/>}/>
    <Route path='/brand/:name/*' element={<BrandCatalog/>}/>

    <Route element={<ProtectedUser/>}>
        <Route path='/user' element={<PersAccUser/>}/>
    </Route>

    <Route element={<ProtectedAdmin/>}>
      <Route path='/admin' element={<PersAccAdmin/>}/>
      <Route path='/admin/orders' element={<OrdersMain/>}/>
    </Route>


    <Route path='/errorPage' element={<Page404/>}/>
    <Route path='/article/1' element={<Article1/>}/>
    <Route path='/article/2' element={<Article2/>}/>
    <Route path='/article/3' element={<Article3/>}/>
    <Route path='/article/4' element={<Article4/>}/>
    <Route path='/search/:query' element={<SearchCatalog/>}/>
    
  </Routes>
</Suspense>
}
