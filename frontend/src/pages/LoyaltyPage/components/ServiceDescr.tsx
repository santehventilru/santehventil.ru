import { useState } from "react"
import { SREVICE_LT } from '@shared/constants/constants'
import DropDownItem from "../ui/DropDownItem"

export default function ServiceDescr(){
    const [active, setActive] =useState('')

    const hadelClick = (item:string) => {
        if(item  === active){
            setActive('')
        }else{
            setActive(item)
        }
    }

    return (
        <div className='list-questions-wp'>
            {SREVICE_LT.map(item => <DropDownItem key={item.id} {...item} active={active} onClick={ () => hadelClick(item.id)}/>)}
        </div>
    )
}