import { useState } from "react";
import { Link } from "react-router-dom";


export default function MobailDropList(){

    const [change, setChange] = useState<boolean>(false)

    const handelDrop  = () => {
        setChange(!change)
    }


    return <div className="menu-down-nav">
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%'}}>
            <div id="CatalogDown" onClick={handelDrop} className="nav-text drop-button-down">Каталог</div>

            <Link to="/shippingInformation" className="nav-text">Доставка</Link>

            <Link to="/brand" className="nav-text">Бренды</Link>

            <Link to="/contats" className="nav-text">Контакты</Link>
        </div>
        {change && 
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%', flexWrap:'wrap', gap:10}}>
            <Link to="/product/8-otoplenie" className="nav-text">Отопление</Link>

            <Link to="/product/194-santex" className="nav-text">Сантехника</Link>

            <Link to="/product/313-santex" className="nav-text">Инструменты</Link>

            <Link to="/product/171-santex" className="nav-text">Для дачи</Link>
        </div>
        }
        



</div>
}