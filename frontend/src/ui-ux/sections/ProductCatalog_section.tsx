import { useEffect, useState, useRef, useCallback } from "react"
import { useLocation, useMatch } from "react-router-dom"
import InfiniteScroll from "../../funcHelper/InfiniteScroll"
import Loader from "../../funcHelper/Loader"
import ProductCard from "../Cards/ProdcutCard"
import { useSelector, useDispatch } from "react-redux"
import {  setActive, resetFilter } from '../../../redux_tollkit/slices/filterSlice/charFilterSlice'
import NoProduct from "../../funcHelper/NoProduct"
import { AppDispatch, RootState } from "../../../redux_tollkit/store/store"
import FilterBuilder from "../../funcHelper/filterBuilder"
import FiltersWrapper from "../filtersCp/FIltersWrapper"
import { backProduct, resetProducts, setProducts } from "@reduxSlice/catalogSlice"
import ObserverProductBack from "../../funcHelper/ObserverProductBack"



interface ProductCardInterface {
    product_id: number, 
    name:string, 
    price: string,
    main_image: string,
    sku: string,
    disc:string,
    final_price:string,
    typesCard:string,
    productpath:string

}



export default function ProductCatalogSection({ferstPath}:{ferstPath:string}) {

    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const fullPath = useLocation().pathname

    let match;
    let path;



    // console.log(ferstPath)

    if (ferstPath === 'product'){
        match = useMatch('/product/:catalog/*')
        path  = match?.params.catalog + (match?.params['*'] ? `/${match.params['*']}` : '');
    }else{
        match = useMatch('/brand/:name/*')
        console.log(match)
        path  =  (match?.params['*'] ? `/${match.params['*']}` : '');
    }

    
    const offset = useSelector((state:RootState) => state.catalogSlice.offset)
    const products = useSelector((state:RootState) => state.catalogSlice.visibleProducts)


    const stateActive = useSelector((state: RootState) => state.charFilterSlice.filterActive);
    // const filterResetStatus = useSelector((state: RootState) => state.charFilterSlice.filterReset);
    const selectedFilters = useSelector((state: RootState) => state.charFilterSlice.selectedFilters);

    const isLoadingRef = useRef(false);
    const dispatch = useDispatch<AppDispatch>();

    



    // Сброс данных при смене пути
    useEffect(() => {
        // let ID : NodeJS.Timeout
        if (fullPath &&  ferstPath === 'product' || 'brand') {

            setHasMore(true);
            dispatch(resetProducts())
            dispatch(resetFilter())
            prodcut(path, 0, []);

        }
        
    }, [fullPath, ferstPath]);


    const loadBack = () => {
    //    const ID  =  setInterval(() => {
            dispatch(backProduct())
        // },300)

        // return () => clearInterval(ID)
    }

    const prodcut = useCallback(async (currentPath: string, currentOffset: number, currentFilters: any[]) => {
        if (isLoadingRef.current) return;
        isLoadingRef.current = true;
        setLoading(true);

        const { queryString } = FilterBuilder({
            path: currentPath,
            offset: currentOffset,
            filters: currentFilters
        });

            let url;
             
            if (ferstPath === 'product'){
                url = `/api/products/catalog?${queryString}`
            }else{
                const params = match?.params as { name?: string };
                const brandName  = params.name?.split('-')[1] || ''
                url = `/api/brand/${brandName}/categories?${queryString}`
            }

            // console.log('Request URL:', url);
    
        try {
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            // console.log(data)
      
            if (data?.length > 0) {

                dispatch(setProducts(data))
                setHasMore(true);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setHasMore(false);
        } finally {
            isLoadingRef.current = false;
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if(stateActive){
            prodcut(path, offset, selectedFilters)
            dispatch(setActive(false));
        }
    },[stateActive])


    return (
        <section id="catalog-section">
            <div className="container cont-bt-mob">
                <div className="wp-otoplenie">

                <FiltersWrapper/>
                    
                    <div className="catalog-wp" id="catalog-wp" >
                        <ObserverProductBack loadBack={() => loadBack()}/>
                        <Loader isLoading={loading} />
                        {products.map((product:ProductCardInterface) => (
                            <ProductCard key={product.product_id} {...product} typesCard="normal" />
                        ))}
                        {products.length === 0 && !loading && <NoProduct />}
                        <InfiniteScroll loadMore={() => !loading && hasMore && prodcut(path, offset, selectedFilters)} />
                    </div>
                </div>
            </div>
        </section>
    );
}