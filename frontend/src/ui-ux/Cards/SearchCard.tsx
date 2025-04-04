import { Link } from "react-router-dom";
import { Trascription } from "../../funcHelper/Transcription";


export default function SearchCard({name, product_id,productpath} :{name:string, product_id:number, productpath:string}){
  

    const nameEn  = Trascription.toTranscription(name.split(' ').join('-'))
    const productPath = Trascription.toTranscription(productpath.split(' ').join('-'))


    return <div className="item-search-list-wp">
      <svg   className="svg-search-pord" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier"> <path d="M11 1H12L16 5L12 9H11V6H5C3.34315 6 2 7.34315 2 9C2 10.6569 3.34315 12 5 12H12V14H5C2.23858 14 0 11.7614 0 9C0 6.23858 2.23858 4 5 4H11V1Z" ></path> 
      </g></svg>
    <Link className='item-search-list' to={`/productpage/${product_id}/${nameEn}/${productPath}`}>
      {name}
    </Link>
  </div>
}