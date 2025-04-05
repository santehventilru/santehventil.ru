import { RouteObject } from "react-router-dom";
import { lazy} from "react";
import { Guard } from './Guard/Components';
const { ProtectedUser, ProtectedAdmin } = Guard;

const Home = lazy(() => import('@pages/MainPage/Home'));
const CatalogPage  = lazy(() => import('@pages/CatalogPage/Catalog'))
const MakingPage = lazy(() => import('@pages/MakeOrderPage/MakingPage'))
const ProductPage = lazy(() => import('@pages/ProductPage/ProductPage'))
const SearchPage = lazy(() => import('@pages/SearchPage/Search'))
const BrandPage = lazy(() => import('@pages/BrandPage/BrandPage'))
const LoytuPage = lazy(() => import('@pages/LoyaltyPage/LouytPage'))
const BrandCatalog = lazy(() => import('@pages/BrandCatalog/BrandCatalog'))
const PersAccUser = lazy(() => import('@pages/AccPage/PersAccUser'))
const PersAccAdmin = lazy(() => import('@pages/AdminPage/PersAccAdmin'))
const Page404 = lazy(() => import('@pages/ErrorPage/Page404'))
const ShearchCatalog = lazy(() => import('@pages/SearchPageCatalog/SearchCatalog'))
const ShipInfo = lazy(() => import('@pages/InformationPage/ShippingInformation'))
const Contacts = lazy(() => import('@pages/ConcatsPage/Contacts'))
const AcrticlePage = lazy(() => import('@pages/acrticlePages/Acrticle1'))
// const PersAccUser = lazy(() => import('@funcCp/PersA/ccUser'))
// const PersAccUser = lazy(() => import('@funcCp/PersAccUser'))

const Routes : RouteObject[]  = [

    { path:'/',  element:<Home/>},
    { path:'/product/:catalog/*', element:<CatalogPage/>},
    { path:'/making_order',  element:<MakingPage/>},
    { path:'/productpage/:id/*',  element:<ProductPage/>},
    { path:'/search',  element:<SearchPage/>},
    { path:'/brand',  element:<BrandPage/>},
    { path:'/loyaltyProg',  element:<LoytuPage/>},
    { path:'/brand/:name/*',  element:<BrandCatalog/>},
    { path:'/errorPage',  element:<Page404/>},
    { path:'/search/:query',  element:<ShearchCatalog/>},
    { path:'/shippingInformation',  element:<ShipInfo/>},
    { path:'/contats',  element:<Contacts/>},
    { path:'//article/:id',  element:<AcrticlePage/>},
    

    {
    element: <ProtectedUser />,
    children: [
        { path: '/user', element: <PersAccUser /> }
    ]
    },

    {
        element: <ProtectedAdmin />,
        children: [
            { path: '/admin', element: <PersAccAdmin /> }
        ]
    },
]


export default Routes

