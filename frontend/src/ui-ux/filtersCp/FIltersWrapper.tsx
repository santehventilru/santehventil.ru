import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux_tollkit/store/store";
import FilterProduct from "./FilterProdcut";
import MobileFilter from "./ModileFilter";


const braekPoint  = 991

export default function FiltersWrapper(){

    const windowSize  =  useSelector((state:RootState) => state.windowsSlice.windowSize)

    const FilterCp = useMemo(() => {
        return windowSize > braekPoint ? 
        <FilterProduct/> : 
        <MobileFilter/>
    },[windowSize])

    return FilterCp
}