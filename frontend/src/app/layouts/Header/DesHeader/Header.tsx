import { useLocation} from 'react-router-dom'

import { useState, useRef, useEffect } from 'react'

import HeaderShFrom from '../HeaderShFrom'
import HeaderMainCp from '../DesHeader/components/HeaderMainCp'
import SubNavHeader from '../DesHeader/components/SubNavHeader'
import SubNavHeader2 from '../DesHeader/components/SubNavHader2'
// import { useDispatch } from 'react-redux'
// import { AppDispatch } from '../../redux_tollkit/store/store'
// import { changeStatus } from '../../redux_tollkit/slices/searchSlice'



export default function Header({handelCart}:{handelCart : () => void}){

    const [openSk, setSh] = useState<boolean>(true)
    const [onpen1 , setSh1] = useState<boolean>(false)
    const [isActive, setIsActive] = useState(false);


    const path  = useLocation()
    const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);


    const handleMouseEnter = () => {
        if (hideTimeout.current) {
          clearTimeout(hideTimeout.current); // Отменяем скрытие
        }
        setIsActive(true);
      };
    
      const handleMouseLeave = () => {
        hideTimeout.current = setTimeout(() => {
          setIsActive(false);
        }, 500); // Даем пользователю 500 мс, чтобы успеть навести курсор на SubNavHeader
      };
      

      const handelClick2  = () => {
        setSh1(!onpen1)
        setIsActive(false)
      }

      const handelClick =() => {
         setIsActive(!isActive);
      }

      useEffect(() => {
        if(path.pathname === '/search'){
          setSh(false)
        }else{
          setSh(true)
        }
      },[path.pathname])

    return <header className="container container-header">

        
    <nav className="wrapper-header">

        {
            openSk ?  <HeaderMainCp  handelClick2={handelClick2} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave}  handelCart={handelCart}/> : <HeaderShFrom/>
        }
    
        

        
   
    </nav>


    {onpen1 && <SubNavHeader2 />}
    {isActive && <SubNavHeader  handelClick={handelClick} handleMouseLeave={handleMouseLeave} handleMouseEnter={handleMouseEnter} />} 

    

     
    
</header>
}