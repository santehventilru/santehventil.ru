
import { useLocation } from "react-router-dom";
import ProductCatalogSection from "../ui-ux/sections/ProductCatalog_section";
import SubCatalogSection from "../ui-ux/sections/SubCatalog_section";

export default function CatalogPage(){

    const location = useLocation().pathname
    const ferstPath = location.split('/')[1]
    

    return <>

        

        <main >
            
            <SubCatalogSection/>
            <ProductCatalogSection ferstPath={ferstPath}/>

        </main>

    </>
}
    
    