import { useEffect, useState, useRef, useCallback} from "react"
import { useLocation, useMatch } from "react-router-dom"
import Loader from "@shared/ui/Loader"
import { useSelector, useDispatch } from "react-redux"
import {  setActive, resetFilter } from '@toolkit/slices/filterSlice/charFilterSlice'
import NoProduct from "@shared/ui/NoProduct"
import { AppDispatch, RootState } from "@toolkit/store/store"
import FilterBuilder from "@shared/utils/filterBuilder"
import FiltersWrapper from "./Filter/FIltersWrapper"
import { resetProducts,setProducts } from "@reduxSlice/catalogSlice"
import Row from "@shared/widgets/Catalog/CatalogScroll/Row";
import StickyList from "@shared/widgets/Catalog/CatalogScroll/List";


export default function ProductCatalogSection({ferstPath}:{ferstPath:string}) {

    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [catalogWd, setCatalog] = useState<number>()
    const catalogRef = useRef<HTMLDivElement>(null)

    const offset = useSelector((state:RootState) => state.catalogSlice.offset)
    const products = useSelector((state:RootState) => state.catalogSlice.visibleProducts)
    const cartRow = useSelector((state:RootState) => state.catalogSlice.cartRowCount)
    // const cartSize  = useSelector((st:RootState) => st.catalogSlice.cartWidth)
    const stateActive = useSelector((state: RootState) => state.charFilterSlice.filterActive);
    const selectedFilters = useSelector((state: RootState) => state.charFilterSlice.selectedFilters);
    const windowSize  =  useSelector((state:RootState) => state.windowsSlice.windowSize)
    
    

    const fullPath = useLocation().pathname
    const isLoadingRef = useRef(false);
    const dispatch = useDispatch<AppDispatch>();

    let match;
    let path;

    if (ferstPath === 'product'){
        match = useMatch('/product/:catalog/*')
        path  = match?.params.catalog + (match?.params['*'] ? `/${match.params['*']}` : '');
    }else{
        match = useMatch('/catalog/brand/:name/*')
        console.log(match)
        path  =  (match?.params['*'] ? `/${match.params['*']}` : '');
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
    
        try {
            
            const response = await fetch(url);
            // console.log(response)

            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log(data)
      
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
        if(catalogRef?.current){
            console.log(windowSize)
            let width  = catalogRef.current.offsetWidth
            setCatalog(width)
            console.log(width)
        }
    }, [windowSize])

    useEffect(() => {
        // let ID : NodeJS.Timeout
        if (fullPath &&  ferstPath === 'product' || 'brand') {
            setHasMore(true);
            dispatch(resetProducts())
            dispatch(resetFilter())
            prodcut(path, 0, []);
        }
        
    }, [fullPath, ferstPath]);

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
                    
                    <div className="catalog-wp" id="catalog-wp" ref={catalogRef}>

                        <Loader isLoading={loading} />
                        <StickyList
                        height={1210}
                        itemCount={products.length / cartRow + 1}
                        productsLength={products.length}
                        itemSize={370}
                        itemsPerRow={cartRow}
                        width={catalogWd || 0}
                        products={products}
                        hasMore={hasMore}
                        loadMore={() => !loading && hasMore && prodcut(path, offset, selectedFilters)}
                        >
                            {Row}
                        </StickyList>
                        {products.length === 0 && !loading && <NoProduct />}
                    </div>
                </div>
            </div>
        </section>
    );
}

  
  