// import { useEffect, useState, useRef, useMemo, useCallback } from "react"
// import { useLocation, useMatch } from "react-router-dom"
// import InfiniteScroll from "../../funcHelper/InfiniteScroll"
// import Loader from "../../funcHelper/Loader"
// import ProductCard from "../Cards/ProdcutCard"
// import { useSelector, useDispatch } from "react-redux"
// import {  setActive, deactiveReset, resetFilter, newPageReset } from '../../../redux_tollkit/slices/filterSlice/charFilterSlice'
// import NoProduct from "../../funcHelper/NoProduct"
// import { AppDispatch, RootState } from "../../../redux_tollkit/store/store"
// import { FiltersArrInterface } from "../../types/interface"
// import { ProductBrand } from "../../api/brandApi"
// import FiltersWrapper from "../filtersCp/FIltersWrapper"
// // import { useLayoutEffect } from "react";

// export default function ProdCatalogBrand() {
//     const [products, setProducts] = useState<any[]>([])
//     const [offset, setOffset] = useState<number>(0)
//     const [filters, setFilters] = useState<FiltersArrInterface[]>([])
//     const [loading, setLoading] = useState<boolean>(false);
//     const [hasMore, setHasMore] = useState<boolean>(true);
//     const [mobFilter, setMobFilter] = useState<boolean>(false)
//     const location = useLocation();

//     const stateActive = useSelector((state: RootState) => state.charFilterSlice.filterActive);//статус активации фильтров
//     const filterResetStatus = useSelector((state: RootState) => state.charFilterSlice.filterReset);//статус сброса филтров 
//     // const windowSize  = useSelector((state:RootState) => state.charFilterSlice.windowSize)
//     const selectedFilters = useSelector((state: RootState) => state.charFilterSlice.selectedFilters);//массив фильтров 

//     const isFirstLoad = useRef(true);
//     const isLoadingRef = useRef(false);

//     const match = useMatch('/brand/:name/*');
//     const brandName  = match?.params.name?.split('-')[1] || ''
//     const path = (match?.params['*'] ? `/${match.params['*']}` : '');
//     console.log(path)

//     const typesCard = 'normal';
//     const dispatch = useDispatch<AppDispatch>();


//     const getProduct = useCallback(
//         async (currentPath: string, currentOffset: number, currentFilters: any[]) => {
//             if (isLoadingRef.current || !hasMore) return;
//             isLoadingRef.current = true;
//             setLoading(true);

//             try {
//                 const result = await ProductBrand({ brand_name:brandName ,path: currentPath, offset: currentOffset, filters: currentFilters });

//                 if (result && result.length > 0) {
//                     setProducts((prevProducts) => [...prevProducts, ...result]);
//                     setOffset((prevOffset) => prevOffset + 16);
//                     setHasMore(true);
//                 } else {
//                     setHasMore(false);
//                 }
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//                 setHasMore(false);
//             } finally {
//                 isLoadingRef.current = false;
//                 setLoading(false);
//             }
//         },
//         [hasMore]
//     );

//     //отселживание изменения пути 
//     useEffect(() => {
//         isFirstLoad.current  = true
//         console.log(selectedFilters)
//         setHasMore(true)
//         setProducts([])
//         setOffset(0)//так же сбрасываем offset 
//     }, [location.pathname, location.pathname.length])
    
//     //начальная загрузка 
//     useEffect(() => {
//         if (isFirstLoad.current) {
//             isFirstLoad.current  = false
//             setFilters(selectedFilters)
//             const fl  = selectedFilters
//             getProduct(path, 0, fl)
//             // console.log('защрущка с ', fl)
//         }
//     },[location.pathname , location.pathname.length])


//     useEffect(() => {
//         if (stateActive) {
//             // Сбрасываем товары и пагинацию при активации фильтров
//             setTimeout(() => {
//                 setProducts([]);
//                 setOffset(0);
//                 setHasMore(true);
//                 setFilters(selectedFilters)
//                 const fl  = selectedFilters
//                 getProduct(path, 0, fl)
//                 dispatch(setActive(false));
//             }, 0);; // Сбрасываем флаг активации
//         }
//     },[stateActive])



//     const filtersReset = useMemo(() => {
//         dispatch(newPageReset());
//         return true;
//     }, [location.pathname]);
  
//     if (!filtersReset) return null;


//     // // Обновление данных при сбросе фильтров
//     useEffect(() => {
//         if (filterResetStatus) {
//             setTimeout(() => {
//                 dispatch(resetFilter())
//                 setProducts([]);
//                 setOffset(0);
//                 setHasMore(true);
//                 setFilters(selectedFilters)
//                 const fl  = selectedFilters
//                 getProduct(path, 0, fl)
//                 // getProduct(path, 0, selectedFilters);
//                 dispatch(deactiveReset());
//             },0)
//              // Сбрасываем состояние сброса фильтров
//         }
//     }, [filterResetStatus]);



//     return (
//         <section id="catalog-section">
//             <div className="container cont-bt-mob">
//                 <div className="wp-otoplenie">

//                     <FiltersWrapper/>

//                     <div className="catalog-wp" id="catalog-wp">
//                         <Loader isLoading={loading} />

//                         {products && products.map((product) => (
//                             <ProductCard key={product.id} {...product} typesCard={typesCard} />
//                         ))}
//                         {products.length === 0  &&  !loading && <NoProduct />}

//                         <InfiniteScroll
//                             loadMore={() => {
//                                 if (!isFirstLoad.current && !loading && hasMore) {
//                                     getProduct(path, offset, filters);
//                                 }
//                             }}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }
