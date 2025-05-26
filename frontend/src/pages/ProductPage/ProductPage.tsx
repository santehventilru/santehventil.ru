import { useEffect , useState} from "react"
import CategorItem from "./ui/CategorItem"
import { addToCartApi } from "@api/cart/cartApi"
import { plusCartCount } from "@toolkit/slices/cartSlice"
import { toggleFavoriteApi } from "@api/favApis"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@toolkit/store/store"
import {toast} from 'react-toastify'
import {RewAddInterface } from "@api/rewApi"
import { useGetRewQuery } from "@reduxApi/rewApi"
import FavBtn from "@shared/ui/FavBtn"
import { plusFavActive } from "@reduxSlice/favProdSlice"
import { ProductDataInterface} from "./type"
import Tabs from "./components/Tabs"
import { RewCardInterface } from "@shared/type"
import ImageBlock from "./components/ImageBlock"



export default function ProductPage({productData}:{productData: ProductDataInterface}){

    const [rews, setRews] = useState<RewCardInterface[]>([])
    const {categories, attributes, product, productImages} = productData

    const loginStatus = useSelector((state:RootState) => state.autoriseSlice.autorisStatus)

    const {
        data: rewData,
        isSuccess: isRewSuccess,
    } = useGetRewQuery('')

    const dispatch = useDispatch<AppDispatch>()

    const toogleFav = async () =>{
        try {
            const product_id = productData.product.product_id
            const result  = await toggleFavoriteApi(product_id)
            if(result){
                dispatch(plusFavActive())
                toast.success('Избранное обновлено')
            }else{
                toast.error('Ошибка добавления')
            }

        } catch (error) {
            
        }
    }
    const addToCart = async () => {
        try {
            const product_id =  productData.product.product_id
            const result = await addToCartApi(product_id)
            if(result){
                dispatch(plusCartCount())
                toast.success('Товар добавлен в корзину')
            }else{
                toast.error('Ошибка добавления')
            }
        } catch (error) {
            console.error('Error fetching cart data:', error);
            return null;
        }
    }

    useEffect(() => {
        if(isRewSuccess){
            const filterRew = rewData.filter((rew:RewAddInterface) =>  rew.product_id === Number(product.product_id))
            setRews([...filterRew])
        }
    },[isRewSuccess,rewData ])

    return  <> 



            <div className="product-wp" >
                <ul className="way-product-wp">
                    <li className="prodcut-item">
                        <a href="/" className="way-text">Главная</a>
                    </li>

                    {categories && categories.map(cat => <CategorItem key={cat.id} {...cat} /> )}

                    <li className="prodcut-item way-text-dop ">
                        <a  className="way-text-dop way-text-dop-name" id="NameTov">{product && product.name}</a>
                    </li>
                </ul>
                    
                <div className="product-main-wp">
                        <ImageBlock product={product} productImages={productImages}/>
                        
                        <div className="product-info" itemScope itemType="https://schema.org/Product">
                            
                            <img src="/img/decor-info-prod.png" alt="Декоративный элемент для карточки товара" className="info-prod-dec"/>
                        
                            <div className="art-kod-wp">
                                <p className="prod-info-text-art" id="sku" itemProp="sku">Артикул:{product && product.sku}</p>
                            </div>
                        
                            
                            <div className="prod-info--name-prod">
                                <p className="prod-info-heading prod-name" itemProp="name">{product &&  product.name}</p>
                                <div className="prod-info-rating-wp">
                                    <p>Отзывы</p>
                                    <div className="rew-estimation prod-info-rating star-tovar-page-mob" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
                                        <img src="/img/i-star.png" alt="Рейтинг: 4 из 5" className="rew-img-star-size"/>
                                        <img src="/img/i-star.png" alt="" className="rew-img-star-size"/>
                                        <img src="/img/i-star.png" alt="" className="rew-img-star-size"/>
                                        <img src="/img/i-star.png" alt="" className="rew-img-star-size"/>
                                        <img src="/img/i-star-empty.png" alt="" className="rew-img-star-size"/>
                                        <meta itemProp="ratingValue" content="4"/>
                                        <meta itemProp="reviewCount" content="120"/>
                                    </div>
                                </div>
                            </div>
                        
                            
                            <div className="prod-info-availability-wp">
                                <div className="prod-info--round"></div>
                                <p className="availability-text" itemProp="availability" content="https://schema.org/InStock">Есть в наличии</p>
                            </div>
                        
                            
                            <div className="prod-info-price-wp">
                                <div className="prod-info-price" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                                    <span itemProp="price">{product && Math.floor(Number(product.price)).toLocaleString('ru-RU')}</span> ₽
                                    <meta itemProp="priceCurrency" content="RUB"/>
                                </div>
                                <FavBtn toogleFav={() => toogleFav()} prodID={Number(product.product_id)}/>
                            </div>
                        
                            
                            <div className="prod-info-button-wp">
                                <button id={product && String(product.product_id)}  onClick={addToCart}className="button button-prod-info"  role="button" title="Добавить товар в корзину">Добавить в корзину</button>
                            </div>
                        
                            
                            <div className="prod-info-delivery--wp">
                                <h3 className="prod-info-heading">Доставка по Москве</h3>
                                <div className="delivery-conditions-conditions">
                                    <svg width="23" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="prod-svg-cond">
                                        <path d="M8.4162 13.9658L8.00892 14.1988L2.75078 17.2066C2.21805 17.5114 1.85473 18.0439 1.76523 18.651L1 23.8427H21.3788L20.4095 18.6064C20.3019 18.0251 19.9426 17.5211 19.4282 17.2299L14.3257 14.3416L13.6619 13.9658" stroke="#7880B5" strokeWidth="1.5"/>
                                        <path d="M16.0618 6.80273V10.0157C16.0618 12.6637 13.9152 14.8103 11.2673 14.8103C8.61926 14.8103 6.47266 12.6637 6.47266 10.0157V6.94486" stroke="#7880B5" strokeWidth="1.5"/>
                                        <path d="M6.48828 5.77848C6.48828 3.1394 8.62767 1 11.2668 1C13.9058 1 16.0452 3.1394 16.0452 5.77848V6.9299H6.48828V5.77848Z" stroke="#7880B5" strokeWidth="1.5"/>
                                        <path d="M14.2812 20.3867H17.7238" stroke="#7880B5" strokeWidth="1.5"/>
                                        <path d="M11.2656 14.8105V23.843" stroke="#7880B5" strokeWidth="1.5"/>
                                    </svg>
                                    <p>Курьером от 2 дней, бесплатно</p>
                                </div>
                            </div>
                        
                        </div>
                     
                        
                       
                       

                </div>

                <Tabs loginStatus={loginStatus} product={product || null} atr={attributes || null} rews={rews || null}/>
 
            </div>
    
    </>
}