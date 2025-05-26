import { useEffect, useState } from "react"

import BrandCard from "./ui/BrandCard"
import { useGetBrandsQuery } from "@reduxApi/brandsApi"
import { BrandCardInterface } from "./type"
import PageLoading from "@shared/components/PageLoading"
import ErrorMessage from "@shared/ui/ErrorMessage"


export default function BrandPage(){
    const {data= [], isSuccess, isError, isLoading} = useGetBrandsQuery('')

    return <>
        <section id="brands">
        <div className="container">
            {isLoading && <PageLoading/>}
            {isError && <ErrorMessage/>}
            {isSuccess && (
                <>
                <h1 className="page-title" >Бренды сантехники</h1> 
                <div className="brends-main-wp">
                    {data && data.length > 0 && data.map((brand: BrandCardInterface) => <BrandCard key={brand.brand_id} {...brand}/>)}
                </div>
                </>
            )}
            
        </div>
    </section>
   
</>
}