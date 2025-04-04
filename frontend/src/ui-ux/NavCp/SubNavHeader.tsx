import {Link} from 'react-router-dom'

export default function SubNavHeader({ handleMouseLeave , handleMouseEnter}:{handelClick:()=> void, handleMouseLeave: () => void, handleMouseEnter: () => void}){
    return <div className="modal-catalog" onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
    <div className="md-catalog-wrap">
        <ul className="catatlog-list">
        <Link to="/product/8-otoplenie" className="nav-text">Отопление</Link>

        <Link to="/product/194-santex" className="nav-text">Сантехника</Link>

        <Link to="/product/313-santex" className="nav-text">Инструменты</Link>

        <Link to="/product/171-santex" className="nav-text">Для дачи</Link>
        </ul>
    </div>
 </div>

}