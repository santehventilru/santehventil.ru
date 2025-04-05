import { useEffect, useState } from 'react'
import { useMatch} from 'react-router-dom'
import SbCatItem from '@shared/widgets/Catalog/FilterSbCatItem'
import {useNavigate} from 'react-router-dom'
import Api from '@api/apiService'
import { parseCategoryPath } from '@shared/utils/ParseCategoryPath'
import { useGetSubCategoryQuery } from '@reduxApi/productsApi'
import { SubCatalogItem } from '@shared/widgets/Catalog/type'
import ArrowSvg from '../assets/ArrowSvg.svg'


export default function SubCatalogSection(){
    const [sbCatalogs, setSubCatalogs] = useState<SubCatalogItem[]>()
    const [count, setCount] = useState<string>('');
    const [name, setName] = useState<string>('');

    const navigate  = useNavigate()
   
    const match = useMatch('/product/:catalog/*');
    const fullPath = match?.params.catalog + (match?.params['*'] ? `/${match.params['*']}` : '');
    
    const categoryIds = parseCategoryPath(fullPath || '');  
    const categoryId = categoryIds[categoryIds.length - 1];

    const {data:subCat = [], isSuccess} = useGetSubCategoryQuery(`suBcategories/${categoryId}`,{
        skip:!categoryId
    })

    useEffect(() => {
        if(isSuccess){
            setSubCatalogs([...subCat])
        }
    },[isSuccess,subCat,categoryId,])

    useEffect(() => {
        Api.get<any>(`/api/categoriesInfo?categoryPath=${encodeURIComponent(fullPath || '')}`).
        then((res) => {
            console.log(res)
            const count  = res.result[0].count_prod || 'xxx'
            const name = res.CategoryName[0].category_name || 'Название не определенно'
            setCount(count)
            setName(name)
        }).catch((err) => {
            console.log(err)
        })
        
    },[fullPath])

    return <section id="sub-catalogs">
        
        <div className="container container-ferst-mobail">
            <div style={{display:"flex", alignItems:"center", flexWrap:'wrap'}}>
                <button onClick={() => navigate(-1)} style={{paddingLeft:10}}>
                    <img style={{height:30, width:30}} src={ArrowSvg} alt="ArrowSvg" />
                </button>
                <div>
                    <h2 className="text-hd--katalog" style={{marginBottom:0}}>
                        <div id="category-name">{name && name}</div>
                    </h2>

                    <sup className="total-count">{count &&  count}</sup>
                </div>
            </div>
            
            <div className="sub-catalog-wp" id="SubСtOtop">
                {isSuccess && sbCatalogs && sbCatalogs.map((item) => {
                    return <SbCatItem key={item.id} {...item}  linkPath={'/product/'} categoryPath={String(fullPath)}/>
                })}
            </div>
        </div>
</section>
}