import { Link } from "react-router-dom";
import { Trascription } from "@shared/utils/Transcription";
import sharedArrow from '../assets/sharedSvgItem.svg'

export default function SearchCard({name, product_id,productpath} :{name:string, product_id:number, productpath:string}){
  

    const nameEn  = Trascription.toTranscription(name.split(' ').join('-'))
    const productPath = Trascription.toTranscription(productpath.split(' ').join('-'))


    return <div className="item-search-list-wp">
      <img className="svg-search-pord" src={sharedArrow} alt="" />
      <Link className='item-search-list' to={`/productpage/${product_id}/${nameEn}/${productPath}`}>
        {name}
      </Link>
  </div>
}