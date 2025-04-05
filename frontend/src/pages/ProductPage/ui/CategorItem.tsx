import { Link } from "react-router-dom"
import { Trascription } from "@shared/utils/Transcription"



export default function CategorItem({category_name, id}:{category_name: string, id:number}){

    const categoryEn = Trascription.toTranscription(category_name)

    return  <li className="prodcut-item way-text-dop" >
                <Link to={`/product/${id}-${categoryEn}`} className="way-text-dop" id="<%= category.category_name %>">{category_name}</Link>
            </li>
}