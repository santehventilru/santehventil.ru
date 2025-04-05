
import { useMatch, useNavigate } from "react-router-dom";
import BrandDescrBlock from "./BrandDescrInfo";
import SbCatItem from "@shared/widgets/Catalog/FilterSbCatItem";
import ArrowSvg from '@pages/CatalogPage/assets/ArrowSvg.svg'
import { SubCatalogItem } from "@shared/widgets/Catalog/type";


export default function SubCtBrand({SbCatList}:{SbCatList:SubCatalogItem[]}){

    const navigate  = useNavigate()
    const match = useMatch('/brand/:name/*');
    const fullPath = (match?.params['*'] ? `/${match.params['*']}` : '');
    

    return <section id="sub-catalogs">
            
            <div className="container container-ferst-mobail">
                <div style={{display:"flex", alignItems:"center", flexWrap:'wrap'}}>
                    <button onClick={() => navigate(-1)} style={{paddingLeft:10}}>
                        <img style={{height:30, width:30}} src={ArrowSvg} alt="ArrowSvg" />
                    </button>
                    <div>
                        <BrandDescrBlock/>
    
                        {/* <sup className="total-count">{count &&  count}</sup> */}
                    </div>
                </div>
                
                <div className="sub-catalog-wp" id="SubСtOtop">
                    {SbCatList && SbCatList.map((item) => {
                        return <SbCatItem key={item.id} {...item} linkPath={`/brand/${match?.params.name}`} categoryPath={String(fullPath)}/>
                    })}
                </div>
            </div>
    </section>
}