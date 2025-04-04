// import { borderRadius, boxSizing, display, padding } from "@mui/system"
import { useNavigate } from "react-router-dom"



export default function AdminMain(){

    const navigate  = useNavigate()

    const openOrder = () => {
        navigate('/admin/orders')
    }

    return <div className="container">
        <div style={styleAdmin.wp}>
            <button style={styleAdmin.buttonAdmin} onClick={openOrder}>Заказы</button>
            <button style={styleAdmin.buttonAdmin}>Товары</button>
        </div>
        
    </div>
}




export const styleAdmin  = {
    buttonAdmin:{
        width:'200px',
        height:'200px',
        backgroundColor:'#fff',
        color:'#000',
        borderRadius:15,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    wp:{
        display:'flex',
        gap:20
    }, 
    buttonSort:{
        backgroundColor:'#6C6C6C',
        padding:10,
        boxSizing:'border-box',
        borderRadius:15,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
        
    }

}