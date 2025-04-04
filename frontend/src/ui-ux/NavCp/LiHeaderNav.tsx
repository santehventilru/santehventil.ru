import {Link} from 'react-router-dom'

export default function LiHeaderNav({text, link}:{text: string, link:string}){
    return <li className="header-item-list">
        <Link to={link} className="nav-text">{text}</Link>
    </li>
}