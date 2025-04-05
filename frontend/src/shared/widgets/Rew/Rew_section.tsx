import { useEffect, useRef, useState } from "react"
import { RewAddInterface } from "@api/rewApi"
import { RewCardInterface } from "@shared/type"
import { useLocation, useParams } from "react-router-dom"
import RewCard from "./ui/RewCard"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@toolkit/store/store"
// import { set } from "react-hook-form"
import { setOpenRegister } from "@toolkit/slices/logRegSlice/loginRegSlice"
import { toast } from "react-toastify"
import { useGetRewQuery, usePostRewMutation } from "@reduxApi/rewApi"
import { useGetUserInfoQuery } from "@reduxApi/userApi"
import SvgRew from '@shared/assets/svg/SvgRew.svg'
import SvgRewClose from'@shared/assets/svg/SvgRewClose.svg'
export default function RewSection(){

    const [rews, setRews] = useState<RewCardInterface[]>([])
    const [modal, setModal] = useState<boolean>(false)
    const [rewAdd, setRewAdd] = useState<boolean>(false)
    const loc  = useLocation()
    const loginStatus = useSelector((state:RootState) => state.autoriseSlice.autorisStatus)
    const {data= [], isSuccess} = useGetRewQuery('')



    useEffect(() => {
        if(isSuccess){
            setRews([...data])
        }
    },[loc.pathname, isSuccess,data])

    

    const handelClick = () => {
        if(loginStatus){
            setRewAdd(true)
        }else{
            setModal(true)
        }
    }
    
    const closeModal = () => {
        setModal(false)
        setRewAdd(false)
    }

    // useEffect(() => {
    //     isSuccess && toast.success('Отзыв добавлен')
    //     isError && toast.error('Ошибка добавления')
    // },[isSuccess, isError])



    return <section id="reviews">
            <div className="container">
                <h2 className="text-title">Отзывы</h2>
                <div className={` ${rews.length === 0 ?  'no-rew-item-wp':'reviews-wrapper' }`}>
                    
                   {rews.length > 0 ? rews.map((rew, index) => <RewCard key={rew.login + String(index)} {...rew}/>) : <div>Нет отзывов</div>}
                </div>
                <div className="flex-left">
                    <button className="rew-open" onClick={handelClick}>
                        <p>Оствавить отзыв</p>

                        <img className="svg-rew" src={SvgRew} alt="SvgRew" />
                            
                    </button>
                </div>
                {modal && <RewNoLogin closeModal={closeModal}/>}
                {rewAdd && <RewAdd closeModal={closeModal} setRewAdd={setRewAdd}/>}
            </div>
 </section>
}


export function RewNoLogin({closeModal}:{closeModal:() => void}){

    const dispatch  = useDispatch<AppDispatch>()

    const goToREgister = () => {
        closeModal()
        dispatch(setOpenRegister())
    }

    return<div className="rew-form-wp" style={{zIndex:20}}> 
            <div className="flex-input">
                <div style={{textAlign:'center'}}>Для того, чтобы оставить отзыв, необходимо зарегистрироваться</div>
                <button className="btn-to-register" onClick={goToREgister}>Перейти к регистрации</button>
                
            </div>
            <div className="btn-rew-close" onClick={closeModal}>
                <img className="svg-order-info-close-rew"  src={SvgRewClose} alt="SvgRewClose" />
            </div>
        </div>
        
}

export function RewAdd({closeModal, setRewAdd}:{closeModal:() => void, setRewAdd:(item:boolean) => void}){


    const [rating, setRating] = useState<number |  string>(5)
    const [login, setLogin] = useState()
    const [text, setText] = useState<string>('')
    const ratingInput  = useRef<HTMLInputElement | null>(null)
    const textInput  = useRef<HTMLTextAreaElement | null>(null)
    const {id}  = useParams()
    const [addRew ,{isSuccess, isError}] = usePostRewMutation()
    const {data:userData = [],  isSuccess:userSuccess} = useGetUserInfoQuery('user')

    useEffect(() => {
        if(userSuccess){
            setLogin(userData[0].login)
        }
    },[userSuccess])

    const changeRating = () => {
        const value  = Number(ratingInput.current?.value)
        if(value >= 1 &&  value <= 5){
            setRating(value)
        }else{
            setRating('')
        }
        
    }
    const changeText  = () => {
        const value  = textInput.current?.value
        if(value){
            setText(value)
        }
        
    }


    const postRew  = async () => {
        if(login){
            const date  = new Date().toISOString().split('T')[0]
            const data : RewAddInterface  = {
                login:login,
                rating:typeof(rating) === 'string' ? 5 : rating,
                product_id: Number(id)? Number(id) : 1,
                text:text,
                review_date:date,
            }
            try {
                await addRew(data)
            } catch (error) {
                console.error('Ошибка добавления', error)
            }
        }else{
            toast.error('Ошибка получения данных')
        }
        
        
    }
    useEffect(() => {
        isSuccess && toast.success('Комментарий добавлен')
        isSuccess &&  setRewAdd(false) 
        isError && toast.error('Ошибка добавления')
    },[isSuccess, isError])

    

    return <div className="rew-form-wp">
                <div className="flex-input">
                    <p>Ваш Login</p>
                    <input type="text" className="rew-input"value={login && login} placeholder="Login" id="input-rew-name" readOnly />
                </div>  
                
                <div className="flex-input">  
                    <p>Комментарий</p>      
                    <textarea  className="rew-input-text" onChange={changeText} ref={textInput} placeholder="введите отзыв" id="input-rew-descr" ></textarea>
                </div>  
                <div className="flex-input">
                    <p>Выберите оценку</p>
                    <div style={{display:'flex', alignItems:'center', gap:10}}>
                        <input type="number"ref={ratingInput} min="1" max="5" className="rew-grade" value={rating} onChange={changeRating} id="rew-grade" placeholder="5"/>
                        <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.6963 6.37248C13.9719 6.10392 14.0692 5.70976 13.9503 5.34336C13.8312 4.97696 13.5208 4.71541 13.1396 4.6599L9.74976 4.16735C9.60539 4.14633 9.48064 4.05578 9.41616 3.92486L7.90066 0.853497C7.7305 0.508403 7.38512 0.293945 7.00022 0.293945C6.6156 0.293945 6.27023 0.508403 6.10006 0.853497L4.58428 3.92514C4.51981 4.05606 4.39478 4.14661 4.2504 4.16763L0.860575 4.66018C0.479597 4.71541 0.168985 4.97724 0.0498417 5.34364C-0.0690209 5.71004 0.0282558 6.1042 0.303826 6.37276L2.75649 8.76347C2.86106 8.86551 2.90899 9.01241 2.88432 9.15594L2.30571 12.5318C2.25441 12.8289 2.33234 13.1179 2.52465 13.3458C2.82349 13.701 3.3452 13.8092 3.76234 13.59L6.79389 11.996C6.92061 11.9296 7.08012 11.9301 7.20655 11.996L10.2384 13.59C10.3858 13.6677 10.5431 13.7069 10.7054 13.7069C11.0017 13.7069 11.2826 13.5752 11.4758 13.3458C11.6684 13.1179 11.746 12.8283 11.6947 12.5318L11.1158 9.15594C11.0912 9.01213 11.1391 8.86551 11.2437 8.76347L13.6963 6.37248Z" fill="#F0BF5F"/>
                        </svg>
                    </div>
                </div>
                <div className="btn-rew-close" onClick={closeModal}>
                    <svg className="svg-order-info-close-rew" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path clipRule="evenodd" d="m7.53033 6.46967c-.29289-.29289-.76777-.29289-1.06066 0s-.29289.76777 0 1.06066l4.46963 4.46967-4.46963 4.4697c-.29289.2929-.29289.7677 0 1.0606s.76777.2929 1.06066 0l4.46967-4.4696 4.4697 4.4696c.2929.2929.7677.2929 1.0606 0s.2929-.7677 0-1.0606l-4.4696-4.4697 4.4696-4.46967c.2929-.29289.2929-.76777 0-1.06066s-.7677-.29289-1.0606 0l-4.4697 4.46963z"  fill-rule="evenodd"></path></g></svg>
                </div>
                <button  onClick={postRew} className=" btn-post-rew">Отправить отзыв</button>
            </div>
}