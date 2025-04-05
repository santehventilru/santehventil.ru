import { useDispatch, useSelector } from "react-redux"
import AddressAndDeliveryForm from "./components/AddresAndDeliv"
import CreatePassForm from "./components/CreatePassFrom"
import UserInfoForm from "./components/InfoUser"
import PordutsOrderForm from "./components/ProductsOrder"
import { useEffect, useState } from "react"
import { setPasswordStep, setPasswordValid } from "@toolkit/slices/makingSlice/makingPasswordFrom"
import {setValidAll} from '@toolkit/slices/makingSlice/makingChekAllValid'
import PaymentForm from "./components/PaymentForm"
import { setCartCount } from "@toolkit/slices/cartSlice"
import { getCartApi } from "@api/cart/cartApi"
import { RootState } from "@toolkit/store/store"
import { createOrderApi, registerApi } from "@api/user/profile-api"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { CartItemInertFace } from "@shared/type"



export interface OrderInterface{
    delivery_type:string,
    delivery_address:string,
    phone:string,
    payment:string,
    status:string,
}


export default function MakingPage(){

    const dispatch = useDispatch()


    const [products, setProduts] = useState<CartItemInertFace[] | null>(null)
    const [totalSum, setTotalSum] = useState<number>(0)
    const [servErr, setServErr] = useState({
        status:false,
        messege:''
    })

    const autorisStatus = useSelector((state:any) => state.autoriseSlice.autorisStatus)
    const addressValid = useSelector((state:any) => state.makkingAdressForm.addressValid)
    const userValid = useSelector((state:any) => state.makingFormControllSlice.userValid)
    const passwordValid = useSelector((state:any) => state.makkingPasswordForm.passwordValid)
    const productValid = useSelector((state:any) => state.makkingProductForm.productValid)
    const allValid = useSelector((state:any) => state.makingCheckValid.allValid)
    const cartCount = useSelector((state:RootState) => state.cartSLice.cartCount)
    const orederInfo = useSelector((state: RootState) => state.createOrderSLice.orderInfo) 
    // console.log(orederInfo)

    const navigate  = useNavigate()

    


    const getCart = async () => {
        try {
          const result = await getCartApi()
          if(result){
            const resArr  = result.products
            const sum = result.totalPrice
            setProduts(resArr)
            if(result.products.length == 0 ){
                dispatch((setCartCount(Number(result.products.length) )))
                setTotalSum(Number(sum))
            }else{
                const newCount  = resArr.reduce((acc:number, item:{quantity:number}) => 
                  {acc += Number(item.quantity)
                    return acc
                  }, 0)
                dispatch(setCartCount(newCount))
                setTotalSum(Number(sum))
            }
          }
        } catch (error) {
          console.error('Error fetching cart data:', error);
            return null;
        }
    }

    const orederCrate = async (data: OrderInterface) => {
        const dataPost  = {...data}
        console.log(data)
        console.log(data['delivery_type'])
        if(dataPost['delivery_type'] === 'SelfCall' || dataPost['payment'] === 'Cash'){
            dataPost['status'] = 'order-create'
            console.log(dataPost)
        }else{
            dataPost['status'] = 'wait-order'
            console.log(dataPost)
        }
        try {
            const result = await createOrderApi(dataPost);
            if (result.success) {
                navigate('/');
                await getCartApi()
                dispatch(setCartCount(0))
                toast.success('Заказ создан')
                console.log('Успех создание заказа');
                return 'Заказ создан';
            } else {
                toast.error('Ошибка создания заказа')
                throw new Error('Ошибка создания заказа');
            }
        } catch (err) {
            console.error('Ошибка', err);
            throw new Error('Ошибка создания заказа');
        }
    };
    
    const reg = async (data: any) => {
        try {
            const result = await registerApi(data);
            if (!result.success) {
                console.log(result.error.message);
                setServErr({
                    status: true,
                    messege: result.error.message || 'Ошибка регистрации',
                });
                throw new Error('Ошибка регистрации');
            } else {
                
                return 'Регистрация успешна';
            }
        } catch (error) {
            console.error('Ошибка при регистрации', error);
            throw new Error('Ошибка регистрации');
        }
    };
    
    const handelOrder = async () => {
        try {
            // Если пользователь не авторизован, сначала выполняем регистрацию
            if (!autorisStatus) {
                const registrationMessage = await reg(orederInfo); // Вызов функции регистрации
                console.log(registrationMessage); // Сообщение о успешной регистрации
                console.log('Создаем заказ...');
        
                // После успешной регистрации создаем заказ
                if (orederInfo['payment'] === 'Card') {
                    const orderMess = await orederCrate(orederInfo);
                    // Переход на юkассу
                    console.log(orderMess);
                    // Логика для перехода на юkассу
                } else {
                    const orderMess = await orederCrate(orederInfo);
                    console.log(orderMess);
                }
            } else {
                // Если пользователь авторизован, сразу создаем заказ
                console.log('Создаем заказ...');
                if (orederInfo['payment'] === 'Card') {
                    // Переход на юkассу
                    console.log(orederInfo);
                     await orederCrate(orederInfo);
                    // Логика для перехода на юkассу
                } else {
                    // Создаем заказ без оплаты
                    console.log(orederInfo);
                     await orederCrate(orederInfo);
                    // Логика для создания заказа без оплаты
                }
            }
        } catch (error) {
            console.error('Ошибка при обработке заказа', error); // Ошибка при регистрации или других проблемах
        }
    };
    
    const daectivError  = () => {
        setServErr({status: false, messege:""})
    }

    useEffect(() => {
        if(autorisStatus){
            dispatch(setPasswordStep(true))
            dispatch(setPasswordValid(true))
        }
    },[])

    useEffect(() => {
        if(addressValid && userValid && passwordValid && productValid){
            dispatch(setValidAll(true))
        }else{
            dispatch(setValidAll(false))
        }

    }, [addressValid, userValid, passwordValid, productValid])


    
      
    useEffect(() => {
        getCart()
    },[cartCount])

    return  <>
    <section id="MakingOrder" onClick={daectivError}>
        <div className="container">
            <h2 className="text-title">Оформление заказа</h2>
            <div className="MakingOrder-wp">
                <div className="MakingOrder-stages-main-wp">
                    
                    <UserInfoForm/>

                    <AddressAndDeliveryForm/>

                    <PordutsOrderForm products={products}/>

                    {!autorisStatus && <CreatePassForm/>}
                 
                </div>
                <div className="MakingOrder-info-wp">
                    <h3 className="MakingOrder-info-heading-text">Итого</h3>

                    <div className="MakingOrder-info-product-information-wp">
                        <div className="MakingOrder-information-item-wp">
                            <p className="MakingOrder-information-item"><span id="QwantCrad">{cartCount}</span> товаров</p>
                            
                        </div>
                        <div className="MakingOrder-information-item-wp">
                            <p className="MakingOrder-information-item">К оплате</p>
                            <p className="MakingOrder-information-item">
                                <span className="MakingOrder-information-item-end">{Math.floor(totalSum).toLocaleString('ru')}</span>₽
                            </p>
                        </div>    
                    </div>

                    <PaymentForm />

                    
                    {allValid && <div className="button-makorder-wp">
                        <button className="button button-MakingOrder" onClick={handelOrder} >заказать</button>
                    </div>}

                    {servErr && <div style={{textAlign:'center', padding:5, boxSizing:'border-box'}} className="error-message">{servErr.messege}</div>}
                    
                </div>
            </div>
        </div>
    </section>
</>
}