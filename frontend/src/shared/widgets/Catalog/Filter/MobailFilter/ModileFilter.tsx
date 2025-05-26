import { setToogleMobalWindow } from "@reduxSlice/filterSlice/charFilterSlice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@toolkit/store/store"
import FilterProduct from "@shared/widgets/Catalog/Filter/DesFilter/FilterProdcut"
import MobdailFilterCounter from "./ui/MibileFilterCounter"


export default function MobileFilter(){


    const dispatch = useDispatch<AppDispatch>()
    const mobFilterActive  = useSelector((state:RootState) => state.charFilterSlice.filterMobalWindow)
    const handleMobOpen = () => dispatch(setToogleMobalWindow())

    return(  
        <>
            <div id="filter-mob-wp" >
                <button onClick={handleMobOpen} style={{
                padding:'15px 15px', boxSizing:'border-box',display:'flex', alignItems:'center',
                    justifyContent:'center',borderRadius:100,boxShadow:'0px 0px 10px var(--bg-shadow-statick-color)',
                    zIndex:20, backgroundColor:'#0D1115'
            }}>
                    <svg  id="btnFilterMobOpen" className="svg-filter-mobail" width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M13 6.99802C13.7538 6.99789 14.4874 6.75454 15.0919 6.30413C15.6963 5.85373 16.1393 5.22031 16.355 4.49802H19C19.2652 4.49802 19.5196 4.39266 19.7071 4.20512C19.8946 4.01759 20 3.76324 20 3.49802C20 3.2328 19.8946 2.97845 19.7071 2.79091C19.5196 2.60338 19.2652 2.49802 19 2.49802H16.355C16.139 1.7761 15.6958 1.14312 15.0914 0.69309C14.487 0.243064 13.7536 0 13 0C12.2464 0 11.513 0.243064 10.9086 0.69309C10.3042 1.14312 9.86103 1.7761 9.645 2.49802H1C0.734784 2.49802 0.48043 2.60338 0.292893 2.79091C0.105357 2.97845 0 3.2328 0 3.49802C0 3.76324 0.105357 4.01759 0.292893 4.20512C0.48043 4.39266 0.734784 4.49802 1 4.49802H9.645C9.86068 5.22031 10.3037 5.85373 10.9081 6.30413C11.5126 6.75454 12.2462 6.99789 13 6.99802ZM1 12.498C0.734784 12.498 0.48043 12.6034 0.292893 12.7909C0.105357 12.9784 0 13.2328 0 13.498C0 13.7632 0.105357 14.0176 0.292893 14.2051C0.48043 14.3927 0.734784 14.498 1 14.498H3.145C3.36103 15.2199 3.80417 15.8529 4.40858 16.3029C5.013 16.753 5.74645 16.996 6.5 16.996C7.25355 16.996 7.987 16.753 8.59142 16.3029C9.19583 15.8529 9.63897 15.2199 9.855 14.498H19C19.2652 14.498 19.5196 14.3927 19.7071 14.2051C19.8946 14.0176 20 13.7632 20 13.498C20 13.2328 19.8946 12.9784 19.7071 12.7909C19.5196 12.6034 19.2652 12.498 19 12.498H9.855C9.63897 11.7761 9.19583 11.1431 8.59142 10.6931C7.987 10.2431 7.25355 10 6.5 10C5.74645 10 5.013 10.2431 4.40858 10.6931C3.80417 11.1431 3.36103 11.7761 3.145 12.498H1Z" />
                    </svg>
                </button>
                <MobdailFilterCounter/>    
            </div>
            {mobFilterActive && <div id={'filter-content-mob'}>
                    <div className="btn-filter-exit-wp">
                        <button className="filter-btn-exit" id="btnFilterCloseMob" onClick={handleMobOpen}>
                            <svg id="SVGRepo_bgCarrier" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g  strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 10L3.29289 10.7071L2.58579 10L3.29289 9.29289L4 10ZM21 18C21 18.5523 20.5523 19 20 19C19.4477 19 19 18.5523 19 18L21 18ZM8.29289 15.7071L3.29289 10.7071L4.70711 9.29289L9.70711 14.2929L8.29289 15.7071ZM3.29289 9.29289L8.29289 4.29289L9.70711 5.70711L4.70711 10.7071L3.29289 9.29289ZM4 9L14 9L14 11L4 11L4 9ZM21 16L21 18L19 18L19 16L21 16ZM14 9C17.866 9 21 12.134 21 16L19 16C19 13.2386 16.7614 11 14 11L14 9Z" ></path> </g></svg>
                        </button>
                    </div>
                    <FilterProduct key={location.pathname} />
                </div>
            } 
        </>
    )
}