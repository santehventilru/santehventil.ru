import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux_tollkit/store/store";
import FilterProduct from "./DesFilter/FilterProdcut";
import MobileFilter from "@shared/widgets/Catalog/Filter/MobailFilter/ModileFilter";
import { FILTER_BREAKPOINT } from "@shared/constants/constants";




export default function FiltersWrapper(){

    const windowSize  =  useSelector((state:RootState) => state.windowsSlice.windowSize)

    const FilterCp = useMemo(() => {
        return windowSize > FILTER_BREAKPOINT
        ? 
        <FilterProduct/> : 
        <MobileFilter/>
    },[windowSize])

    return FilterCp
}