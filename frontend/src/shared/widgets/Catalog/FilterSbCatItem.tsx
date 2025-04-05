import {Link} from 'react-router-dom'
import { Trascription } from "@shared/utils/Transcription"
import { SubCatalogItem } from './type'


export default function SbCatItem({id, category_name,categoryPath, linkPath }:SubCatalogItem){
    const newPath = Trascription.toTranscription(category_name)

    return  <Link to={`${linkPath}${categoryPath}/${id}-${newPath}`} id='${id}' className="sub-catalog--item" itemScope itemType="https://schema.org/CategoryCode">
    <meta itemProp="name" content={category_name}/>
    <meta itemProp="identifier" content={String(id)}/>
    <div>{category_name}</div>
</Link>
}