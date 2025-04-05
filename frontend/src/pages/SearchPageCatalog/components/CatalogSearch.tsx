import { useCallback, useEffect, useRef, useState } from "react";

import Loader from "@shared/ui/Loader";
import ProductCard from '@shared/ui/ProdcutCard'
import { useLocation, useParams } from "react-router-dom";
import { getSeachResultApi } from "@api/searchApi";
import NoProduct from "@shared/ui/NoProduct";
import InfiniteScroll from "@shared/components/InfiniteScroll";





export default function CalatogSearch() {
   
    const [products, setProducts] = useState<any[]>([])
    const [offset, setOffset] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const location = useLocation();
    const {query} = useParams()


    const isFirstLoad = useRef(true);
    const isLoadingRef = useRef(false);

    const typesCard = 'normal';
   

    const getProduct = useCallback(
            async (currentOffset: number,) => {
                if (isLoadingRef.current || !hasMore || !query) return;
                isLoadingRef.current = true;
                setLoading(true);
    
                try {
                    const result = await getSeachResultApi(query,currentOffset);
    
                    if (result && result.length > 0) {
                        setProducts((prevProducts) => [...prevProducts, ...result]);
                        setOffset((prevOffset) => prevOffset + 16);
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
            },
            [hasMore]
        );

    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current  = false
            getProduct(0)
        }
    },
    [location.pathname])



    return <section id="serchCatalog">
        <div className="container cont-bt-mob">
            <div className="wp-otoplenie">
                    <div className="catalogSearch" id="catalog-wp">
                        <Loader isLoading={loading} />

                        {products && products.map((product) => (
                            <ProductCard key={product.id} {...product} typesCard={typesCard} />
                        ))}
                        {products.length === 0  &&  !loading && <NoProduct />}

                        <InfiniteScroll
                        style={{}}
                            loadMore={() => {
                                if (!isFirstLoad.current && !loading && hasMore) {
                                    getProduct(offset);
                                }
                            }}
                        />
                    </div>
            </div>
        </div>
    </section>
}