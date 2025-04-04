import {Link} from 'react-router-dom'
import { Trascription } from '../../funcHelper/Transcription'
import { SubCatalogItem } from '../../types/interface'
// import { useDispatch } from 'react-redux'
// import {deactiveReset, resetFilter} from '../../../redux_tollkit/slices/filterSlice/charFilterSlice'

export default function SbCatItem({id, category_name,categoryPath, linkPath }:SubCatalogItem){
    
    const newPath = Trascription.toTranscription(category_name)

    // const navigate = useNavigate()
    // const dispatch = useDispatch()


    // const handelCLick = () => {
    //     dispatch(resetFilter())
    // }

    return  <Link to={`${linkPath}${categoryPath}/${id}-${newPath}`} id='${id}' className="sub-catalog--item" itemScope itemType="https://schema.org/CategoryCode">
    <meta itemProp="name" content={category_name}/>
    <meta itemProp="identifier" content={String(id)}/>
    <div>{category_name}</div>
</Link>
}