import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import SubCtBrand from "../ui-ux/sections/SubCtBrand"
import { SubCatalogItem } from "../types/interface"
import Api from "../api/apiService"
import ProductCatalogSection from "../ui-ux/sections/ProductCatalog_section"



export interface BrandInfoIntreface{
    name:string,
    filename?:string,
    description:string
}

export default function BrandCatalog(){

    const [subCatalogs, setSbCat] = useState<SubCatalogItem[]>()
    const location = useLocation().pathname
    const ferstPath = location.split('/')[1]

    const {name}  =  useParams()
    const brandId  = name?.split('-')[0]
    // const pathName  = useLocation()
    const pathBrand  = useLocation().pathname.split('/').slice(-1)[0].split('-')[0]
    const brand_id  =  pathBrand !== brandId ? pathBrand : null

    useEffect(() => {
        Api.get<SubCatalogItem[]>(`/api/brand/subCategories/${brandId}?categoryId=${brand_id ?  brand_id : ''}`)
        .then((res) => {
            setSbCat(res)
        }).catch((error) => {
            console.error('Error get brand', error);
        })
    },[location])


    return <main>
        {subCatalogs && <SubCtBrand SbCatList={subCatalogs}/>}
        <ProductCatalogSection ferstPath={ferstPath}/>
        {/* <ProdCatalogBrand/> */}
 </main>

}

