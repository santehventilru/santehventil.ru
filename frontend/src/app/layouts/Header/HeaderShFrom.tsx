import { useDispatch } from "react-redux"
import { AppDispatch } from "@toolkit/store/store"
import {  useRef } from "react"
import { setSearchQuery } from "@toolkit/slices/searchSlice"
import { useNavigate } from "react-router-dom"
import cross from'./assets/SearchCross.svg'

export default function HeaderShFrom(){

    const dispatch  = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const inputEl = useRef<HTMLInputElement | null>(null)

    const handelCahage = () => {
        const query = inputEl.current?.value
        if(query && query.length > 3){
            dispatch(setSearchQuery(query))
        }
    }

    const handelReset = () => {
        dispatch(setSearchQuery(''))
       if(inputEl.current ){
        inputEl.current.value  = ''
       }
        
    }

    const handelKeyDown  = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const query = inputEl.current?.value
        if(query && query?.length > 3){
            if (event.key === "Enter" || event.key === "Go" || event.key === "Search" || event.key === "Done") {
               navigate(`/search/${query}`)
            }
        }

    }

    const navBack = () => {
        navigate(-1)
    }

    

    return <>
    
    <div className='header-form-search'>
            <div className='input-search-header-wp'>
            <input className='input-search-header' ref={inputEl}  onKeyDown={handelKeyDown} onChange={handelCahage} placeholder="Тут можно найти"/>
            <button className='btn-cross-wp' onClick={handelReset}>
            <svg className='svg-cross-header' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> <path d="M19 5L5 19M5 5L9.5 9.5M12 12L19 19"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> 
                </g>
            </svg>
                
            </button>
            </div>
            
            <button className='button btn-search-haeder-main' onClick={navBack}>Закрыть</button>
    </div>

    <div className="search-list-wp">
            
    </div>
</>
    
}