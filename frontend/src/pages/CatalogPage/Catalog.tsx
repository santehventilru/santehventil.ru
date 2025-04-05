
import { useLocation } from "react-router-dom";
import ProductCatalogSection from "@shared/widgets/Catalog/ProductCatalog_section";
import SubCatalogSection from "./components/SubCatalog_section";

export default function CatalogPage(){

    const location = useLocation().pathname
    const ferstPath = location.split('/')[1]
    

    return <>

        

        < >
            
            <SubCatalogSection/>
            <ProductCatalogSection ferstPath={ferstPath}/>

        </>

    </>
}
    
    