import {Link} from 'react-router-dom'
// import LiHeaderNav from './LiHeaderNav'

export default function SubNavHeader2 (){


    // const liNav = [
    //     {
    //         text: 'Доставка',
    //         link:'/shippingInformation',
    //     },
    //     {
    //         text: 'Бренды',
    //         link:'/brand',
    //     },
    //     {
    //         text: 'Контакты',
    //         link:'/contats',
    //     },
    // ]


    return <div className="modal-catalog" style={{width:'auto', padding:20}}>
    <div className="md-catalog-wrap"  style={{display:'flex', flexDirection:"column"}} >
        <ul className="wp-nav" style={{order: 0, height:40, width:'100%', gap:20,padding:'20px'}}>
            <li className="header-item-list" style={{display:'block'}} >
                <a id="Katalog" className="nav-text drop-button "style={{display:'block'}}>Каталог</a>
            </li>
            <li className="header-item-list" style={{display:'block'}}>
                <Link to='/shippingInformation' className="nav-text" style={{display:'block'}}>Доставка</Link>
            </li>
            <li className="header-item-list" style={{display:'block'}}>
                <Link to='/brand' className="nav-text" style={{display:'block'}}>Бренды</Link>
            </li>
            <li className="header-item-list" style={{display:'block'}}>
                <Link to='/contats' className="nav-text" style={{display:'block'}}>Контакты</Link>
            </li>
            
        </ul>
        <ul className="catatlog-list" style={{padding:20}}>
        <Link to="/product/8-otoplenie" className="nav-text">Отопление</Link>

        <Link to="/product/194-santex" className="nav-text">Сантехника</Link>

        <Link to="/product/313-santex" className="nav-text">Инструменты</Link>

        <Link to="/product/171-santex" className="nav-text">Для дачи</Link>
        </ul>
    </div>
 </div>

}