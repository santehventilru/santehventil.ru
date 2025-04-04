import { Link } from "react-router-dom"

export default function BrandCard({name, filename, brand_id}:{name:string, filename:string, brand_id:number}){

    const idString  = String(brand_id)
    return <Link className="item-brends flex-ref" id={idString} to={`/brand/${brand_id}-${name}`}>
                <div className="brand-wp">
                    <div className="brand-wp-img-wp">
                        <img src={`${filename}`} width="300px" height="300px" alt={`${name} сантехника и отопление`} className="brends-img"/>
                    </div>
                </div>
                <p className="name-brends">{name}</p>
            </Link>
}