import {Link} from 'react-router-dom'

export default function SubNavHeader({handelClick, handleMouseLeave , handleMouseEnter}:{handelClick:()=> void, handleMouseLeave: () => void, handleMouseEnter: () => void}){
    return <div className="modal-catalog" onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
    <div className="md-catalog-wrap">
        <ul className="catatlog-list">
            <li ><Link to="/product/8-otoplenie" className="catalog-list--item" onClick={handelClick}>Отопление</Link></li>
            <li ><Link to="/product/5-santex" className="catalog-list--item" onClick={handelClick}>Сантехника</Link></li>
            <li ><Link to="/product/165-santex" className="catalog-list--item" onClick={handelClick}>Инструменты</Link></li>
            <li ><Link to="/product/171-santex" className="catalog-list--item" onClick={handelClick}>Для дачи</Link></li>
        </ul>
    </div>
 </div>

}