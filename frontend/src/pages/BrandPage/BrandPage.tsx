import { useEffect, useState } from "react"

import BrandCard from "./ui/BrandCard"
import { useGetBrandsQuery } from "@reduxApi/brandsApi"
import { BrandCardInterface } from "./type"


export default function BrandPage(){

    const [brands, setBrands] = useState<BrandCardInterface[]>([])
    const {data= [], isSuccess, isError, isLoading} = useGetBrandsQuery('')


    useEffect(() => {
        if(isSuccess){
            setBrands([...data])
        }
    },[isSuccess, data])

    if(isLoading) return <div>Загрузка</div>
    if(isError) return <div>Ошибка</div>

    return <>
        <section id="brands">
        <div className="container">
            <h1 className="page-title" >Бренды сантехники</h1> 
            <div className="brends-main-wp">
                {brands && brands.length > 0 && brands.map((brand) => <BrandCard key={brand.brand_id} {...brand}/>)}
            </div>
        </div>
    </section>
   
</>
}