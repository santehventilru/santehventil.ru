import logoSvg from '../../assets/logo-svg.svg'
// import {Link} from 'react-router-dom'
import LiHeaderNav from './LiHeaderNav'
import { useDispatch, useSelector } from 'react-redux'
import {setOpenLogin, setCloseModals} from '@toolkit/slices/logRegSlice/loginRegSlice'
// import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '@toolkit/store/store'
import { LI_NAV } from '@shared/constants/constants'



export default function HeaderMainCp({handelCart,   handleMouseLeave, handleMouseEnter, handelClick2}:{handelClick2:() => void,  handelCart: () => void, handleMouseEnter: () => void, handleMouseLeave: () => void }){

    const role  = useSelector((state:RootState) => state.autoriseSlice.role)
    const dispatch = useDispatch<AppDispatch>()
    const navigate  = useNavigate()

    const handelOpenLogin  = () => {
        dispatch(setOpenLogin())
    }
    
    const autorisState = useSelector((state:RootState) => state.autoriseSlice.autorisStatus)
    const cartCount = useSelector((state:RootState) => state.cartSLice.cartCount)
    

    const handelAccNav = () => {
        if(role === "admin"){
            navigate('/admin')
        }else{
            navigate('/user')
        }
        
        dispatch(setCloseModals())
    }

   
    // useEffect(() => {

    // })

    return <>
        <div className="wp-logo" >
                    <a href="/"  className="hd-logo">
                        <img src={logoSvg} alt="" className="svg-logo"/>   
                    </a>  
                </div>

                <ul className="wp-nav">
                    <li className="haeder-burger" onClick={handelClick2}>
                        <svg height="20" width="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" className="svg-burger"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Menu_Alt_05"> 
                        <path id="Vector" d="M5 17H13M5 12H19M11 7H19" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        </path> 
                        </g> </g></svg>
                    </li>
                    <li className="header-item-list" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <a id="Katalog" className="nav-text drop-button">Каталог</a>
                    </li>
                    {LI_NAV.map((item) => (<LiHeaderNav key={item.text} {...item}/>))}
                </ul>


                <div className="form-search">

                    <Link  className="button-search display-none-mob" to={'/search'}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="white" xmlns="http://www.w3.org/2000/svg" className="svg-search-header">
                            <path d="M14.5726 16.0029C10.5755 19.1865 4.988 18.3056 2.02842 14.6542C-0.828088 11.129 -0.64944 6.04347 2.44943 2.82482C5.65137 -0.500594 10.6854 -0.944524 14.3346 1.78337C15.642 2.76051 16.6183 4.00364 17.2542 5.50838C17.8938 7.02186 18.0881 8.59654 17.8663 10.2205C17.6452 11.837 17 13.2775 15.9499 14.6217C16.0349 14.6773 16.1255 14.7173 16.1904 14.7822C17.3448 15.9311 18.4947 17.0843 19.6491 18.2331C19.9227 18.5054 20.0589 18.8225 19.9776 19.2047C19.8165 19.9651 18.9107 20.2586 18.3298 19.7366C18.0575 19.4925 17.807 19.2234 17.5484 18.9649C16.6002 18.0177 15.6526 17.0699 14.7044 16.1227C14.665 16.0853 14.6238 16.0503 14.5726 16.0029ZM15.9605 8.98677C15.9705 5.12689 12.8529 2.00627 8.98261 2.00065C5.12292 1.99503 2.00781 5.09068 1.99094 8.94806C1.97408 12.8173 5.08544 15.9467 8.96762 15.9648C12.8117 15.9829 15.9505 12.8504 15.9605 8.98677Z" />
                        </svg>      
                    </Link>
                </div>

                <button className="button-cart display-none-mob" onClick={handelCart}>
                    <div className="count-basket-item-wp">
                        <div className="item-basket-pop-count">
                            {cartCount}
                        </div>
                    </div>
                    <svg width="31" height="24" viewBox="0 0 31 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.1558 20.25H9.89066C6.78905 20.25 4.26569 17.7267 4.26569 14.6251V8.85947C4.26569 5.9762 2.82861 3.30739 0.421544 1.72031C-0.0107343 1.43531 -0.130077 0.853876 0.154921 0.421598C0.439919 -0.0107278 1.02131 -0.130118 1.45368 0.154974C2.82776 1.06097 3.94254 2.2559 4.73969 3.63167C4.91195 3.82466 6.30104 5.29699 8.57821 5.29699H19.3738C22.3191 5.24191 24.6245 8.19769 23.8544 11.0406L22.6117 15.9939C21.9829 18.4998 19.7394 20.25 17.1558 20.25ZM5.90415 6.64234C6.06001 7.36238 6.14068 8.10483 6.14068 8.85947V14.6251C6.14068 16.6928 7.82292 18.375 9.89066 18.375H17.1558C18.8782 18.375 20.3739 17.2082 20.793 15.5376L22.0358 10.5844C22.4933 8.89509 21.1233 7.13931 19.3738 7.17198H8.57817C7.54828 7.17198 6.65185 6.94993 5.90415 6.64234ZM9.42191 22.8281C9.42191 22.1809 8.89724 21.6563 8.25004 21.6563C6.69511 21.7182 6.69647 23.9387 8.25004 24C8.89724 24 9.42191 23.4753 9.42191 22.8281ZM18.75 22.8281C18.75 22.1809 18.2253 21.6563 17.5781 21.6563C16.0232 21.7182 16.0245 23.9387 17.5781 24C18.2253 24 18.75 23.4753 18.75 22.8281ZM20.3113 9.98446C20.3113 9.46668 19.8916 9.04697 19.3738 9.04697H8.95316C7.7093 9.09647 7.71023 10.8729 8.95316 10.922H19.3738C19.8916 10.922 20.3113 10.5022 20.3113 9.98446Z" fill="white"/>
                        
                    </svg>
                </button>

                <div className="login-wraper-button">


                    { autorisState ? 
                    
                    <button className="button button-login display-none-mob " style={{backgroundColor:"transparent", outline:"none", paddingBottom:0, paddingTop:0}} onClick={handelAccNav}>
                        <svg  className ="svg-login-grouр-header"  viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 11C12.6569 11 14 9.65685 14 8C14 6.34315 12.6569 5 11 5C9.34315 5 8 6.34315 8 8C8 9.65685 9.34315 11 11 11Z" stroke="white" strokeWidth="1.5"/>
                            <path d="M16.9696 19C16.8105 16.1085 15.9252 14 11.0004 14C6.0757 14 5.1904 16.1085 5.03125 19" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                            <path className="rotating-path" d="M6 2.33782C7.47087 1.48697 9.1786 1 11 1C16.5228 1 21 5.47715 21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 9.1786 1.48697 7.47087 2.33782 6" stroke="#F6D863" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                    </button>
                    
                    :
                    <button className="button button-login display-none-mob" onClick={handelOpenLogin}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="white" className="svg-login"  xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.1592 10.1003H8.125"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M15.7207 7.66992L18.1607 10.0999L15.7207 12.5299"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path  d="M13.6328 6.35768C13.3578 3.37435 12.2411 2.29102 7.79948 2.29102C1.88198 2.29102 1.88198 4.21602 1.88198 9.99935C1.88198 15.7827 1.88198 17.7077 7.79948 17.7077C12.2411 17.7077 13.3578 16.6243 13.6328 13.641"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                            
                        <span className="center display-none" >Войти</span>
                    </button>

                    }
                    
                </div> 
               
</>
}