import { useCallback, useEffect, useState } from "react"
import ShDefList from "./components/ShDefListWp"
import { getPopulatProdutsApi, getPopulatProdutsApi2, getSeachResultApi } from "@api/searchApi"
import { useSelector } from "react-redux"
import { RootState } from "@toolkit/store/store"
import SearchCard from "./ui/SearchCard"
import { ProductCardInterface } from "@shared/widgets/Catalog/CatalogScroll/types"

export interface SearchCard{
    product_id:number,
    name:string,
    productpath:string
}

export default function SearchPage(){

    const [fesrt, setFerst] = useState<ProductCardInterface[]>([])
    const [second, setSecond] = useState<ProductCardInterface[]>([])
    const [shProd, setShProd] = useState<SearchCard[]>()
    const [noprod, setNoprod] = useState<string | boolean>(false)
    // const [brands, setBrands] = useState<[]>()
    // const [offset, setOffset] = useState<number>(0)

    const searchQuery  = useSelector((state:RootState) => state.shearchSlice.searchQuery)


    const getBeginnInfoPrducts = async () => {
        try {
            const result = await getPopulatProdutsApi()
            if(result){
                setFerst(result)
            }
            return false
        } catch (error) {
            return false
        }
    }


    const getBeginnInfoPrducts2 = async () => {
        try {
            const result = await getPopulatProdutsApi2()
            if(result){
                setSecond(result)
            }
            return false
        } catch (error) {
            return false
        }
    }

    const getResultSearch = useCallback(async  () => {
        if(searchQuery.length > 3){
            const offset = 0
            try {
                
                const result = await getSeachResultApi(searchQuery,offset)
                console.log(result)
                if(result.length > 0 ){
                    setShProd(result)
                    setNoprod(false)
                }else{
                    setShProd([])
                    setNoprod('noprod')
                }
            } catch (error) {
                
            }
        }else{
            setShProd([])
            setNoprod(false)
        }
        
    },[searchQuery])
    // const getBeginnInfoBrands = async () => {
    //     try {
    //         const result = await func()
    //         if(result){
                
    //         }
    //         return false
    //     } catch (error) {
    //         return false
    //     }
    // }

    useEffect(() => {
        getBeginnInfoPrducts()
        getBeginnInfoPrducts2()
    },[])

    useEffect(() => {
        getResultSearch()
    },[searchQuery])

    return  <>
        <section id='search'>
            <div className="container" style={{display:'flex', flexDirection:'column', 
                gap:30
            }}>
                {/* окнка списка товаров */}
                <div style={{display:'flex', gap:10, flexDirection:'column'}}>
                {shProd && shProd.length > 0 && shProd.map(cart => <SearchCard key={cart.product_id} {...cart}/> )}
                {noprod === 'noprod' && <div style={{textAlign:"center"}}>Таких продуктов нет</div>}
                </div>
                {/* окновы вывод начальной продукиции рекомендованные товары */}

                {fesrt?.length > 0  && <ShDefList products={fesrt} haederText="Лучшие товары "/>}
                {second?.length  > 0 && <ShDefList products={second} haederText="Самые лучшие товары "/>}
                <div>
                    Вывод рекомендоваций 
                </div>
                {/* окно вывода списка реоменлованных брендов */}
                <div>
                    Список рекомендованные бренды
                </div>
            </div>
        </section>
    </>
}