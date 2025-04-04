// import { useNavigate } from "react-router-dom";
import { styleAdmin } from "./MainPage";


export default function OrdersAdminSelect(){

    // const navigate = useNavigate()
    const orderSearch = () => {
        
    }


    return <div className="container">
        <div style={styleAdmin.wp}>
            <button style={styleAdmin.buttonAdmin} onClick={orderSearch}>Поиск заказа по ID</button>
            <button style={styleAdmin.buttonAdmin}>Вывод всех заказав</button>
        </div>
    </div>
}