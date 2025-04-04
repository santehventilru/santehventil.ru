import { useEffect, useState } from "react";
import {chekAdminApi} from '../../api/user/status-api'
import { Outlet, } from "react-router-dom";




export default function ProtectedAdmin(){
    const [isAdmin, setAdmin] = useState<boolean | null>(null)

    useEffect(() => {
        async function name() {
            const authStatus  = await chekAdminApi()
            setAdmin(!!authStatus)        
        }
        name()
    }, [])

    if (isAdmin === null) return <div>Загрузка...</div>

    return isAdmin ?  <Outlet/> : <div>Gavno</div>
}