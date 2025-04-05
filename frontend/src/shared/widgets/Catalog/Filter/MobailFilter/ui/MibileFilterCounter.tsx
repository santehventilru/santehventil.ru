import { useSelector } from "react-redux"
import { RootState } from "@toolkit/store/store"



export default function MobdailFilterCounter(){


    const filter  = useSelector((state:RootState) => state.charFilterSlice.selectedFilters).length


    if(filter === 0 ) return null
    if(filter > 0) return <div className="mobFilterCounterWp">
        <div>{filter}</div>
    </div>
}