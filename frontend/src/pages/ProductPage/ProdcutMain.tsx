import HitsSection from "@shared/components/Hits_sections"
import PageLoading from "@shared/components/PageLoading"
import ErrorMessage from "@shared/ui/ErrorMessage"
import { useLazyGetProductsQuery } from "@toolkit/api/productsApi"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import ProductPage from "./ProductPage"


export default function ProdcutMain(){

    const [fetchProdct , {data, isError, isSuccess, isLoading}] = useLazyGetProductsQuery()
    const {id} = useParams<string>()

    useEffect(() => {
        fetchProdct(`id/${id}`)
    },[id])
    console.log(data)

    return (
        <>
            <section id="ProdcutPage">
                <div className="container">
                    {isLoading && <PageLoading/>}
                    {isError && <ErrorMessage/>}
                    {isSuccess && <ProductPage productData={data}/>}
                </div>
            </section>
            <HitsSection/>
        </>
        
        
    )
}