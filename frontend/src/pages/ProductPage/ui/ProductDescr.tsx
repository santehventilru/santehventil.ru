import { useEffect, useState } from "react"

export default function PorductDescr({description}:{description:string}){


    const [dascrArr ,setDescrArr] = useState<string[] | null>()


    useEffect(() => {
        const arr = description.split(/[.;]+/).slice(0, -1)
        setDescrArr(arr)
    },[])



    return <>
    {dascrArr && dascrArr.map(par => <p key={par} className="product-text-formated">{par}.</p>)}
    
    </>
}