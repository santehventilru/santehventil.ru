import { useEffect , useState} from "react"
import {  useLocation, useParams } from "react-router-dom"
import CategorItem from "./ui/CategorItem"
import ProdImageItem from "./ui/ProdIamgeItem"
import HitsSeaction from "@shared/components/Hits_sections"
import { addToCartApi } from "@api/cart/cartApi"
import { plusCartCount } from "@toolkit/slices/cartSlice"
import { toggleFavoriteApi } from "@api/favApis"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@toolkit/store/store"
import {toast} from 'react-toastify'
import {RewAddInterface } from "@api/rewApi"
import {useLazyGetProductsQuery} from "@reduxApi/productsApi"
import { useGetRewQuery } from "@reduxApi/rewApi"
import FavBtn from "@shared/ui/FavBtn"
import { plusFavActive } from "@reduxSlice/favProdSlice"
import { AttributeProduct, ImageProductPage, PorductItemWayInterface ,PorductFromProdPage} from "./type"
import Tabs from "./components/Tabs"
import { RewCardInterface } from "@shared/type"


export default function ProductPage(){

    const [categoriesA, setCategories] = useState<PorductItemWayInterface[] | null>()
    const [productImagesA, setProductImages] = useState<ImageProductPage[] | null>()
    const [productA, setProduct] = useState<PorductFromProdPage>()
    const [attributesA, setAttributes] = useState<AttributeProduct[] | null>()
    const [mainImage, setMainImage] = useState<string >('')
    const [rews, setRews] = useState<RewCardInterface[]>([])
    const path  = useLocation().pathname
    const {id} = useParams<string>()
    const idProduct  = id?.split('-')[0]
    // console.log(idProduct)
    const idNumber = Number(id);
    


    const loginStatus = useSelector((state:RootState) => state.autoriseSlice.autorisStatus)

    const [fetchProdct , {isError, isSuccess, isLoading}] = useLazyGetProductsQuery()

    const {
        data: rewData,
        isSuccess: isRewSuccess,
    } = useGetRewQuery('')

   

    const dispatch = useDispatch<AppDispatch>()

    const toogleFav = async () =>{
        try {
            const product_id = idNumber
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
            const product_id = idNumber
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
    const changeImage = (url:string) => {
        setMainImage(url)
    }

    useEffect(() => {

        if(id){
            fetchProdct(`id/${idProduct}`)
            .then((res) => {
                if(res.status === "fulfilled"){
                    const {categories, productImages, product, attributes}= res.data
                    setCategories(categories)
                    setProductImages(productImages)
                    setProduct(product)
                    setAttributes(attributes)
                    setMainImage(product.main_image)
                }
            }).catch((err) => {
                console.error('Req err' , err)

            })
        }
    },[id])

    useEffect(() => {
        if(isRewSuccess){
            const filterRew = rewData.filter((rew:RewAddInterface) =>  rew.product_id === Number(idProduct))
            setRews([...filterRew])
        }
    },[isRewSuccess,rewData ,path])

    if(isLoading) return <div>Загрузка</div>
    if(isError) return <div>Ошибка</div>
    if(isSuccess) return  <> 
    <section id="ProdcutPage">
        <div className="container">
            <div className="product-wp" >
                <ul className="way-product-wp">
                    <li className="prodcut-item">
                        <a href="/" className="way-text">Главная</a>
                    </li>

                    {categoriesA && categoriesA.map(cat => <CategorItem key={cat.id} {...cat} /> )}

                    <li className="prodcut-item way-text-dop ">
                        <a  className="way-text-dop way-text-dop-name" id="NameTov">{productA && productA.name}</a>
                    </li>
                </ul>
                    
                <div className="product-main-wp">
                    <div className="prodcut-big-item">
                            
                            <ul className="dop-foto-prod-wp">
                                {productImagesA && productImagesA.map(image => <ProdImageItem key={image.add_image}  newImage={mainImage} changeImage={changeImage} {...image}/>)}
                            </ul>
                            
                            
                            
                            <div id="main" className="main-foto-wp">
                                 <img src={mainImage && mainImage} alt="" className="img-tovar-main"/> 
                                
                            </div>


                    </div>
                        
                        <div className="product-info" itemScope itemType="https://schema.org/Product">
                            
                            <img src="/img/decor-info-prod.webp" alt="Декоративный элемент для карточки товара" className="info-prod-dec"/>
                        
                            <div className="art-kod-wp">
                                <p className="prod-info-text-art" id="sku" itemProp="sku">Артикул:{productA && productA.sku}</p>
                            </div>
                        
                            
                            <div className="prod-info--name-prod">
                                <p className="prod-info-heading prod-name" itemProp="name">{productA &&  productA.name}</p>
                                <div className="prod-info-rating-wp">
                                    <p>Отзывы</p>
                                    <div className="rew-estimation prod-info-rating star-tovar-page-mob" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
                                        <img src="/img/i-star.webp" alt="Рейтинг: 4 из 5" className="rew-img-star-size"/>
                                        <img src="/img/i-star.webp" alt="" className="rew-img-star-size"/>
                                        <img src="/img/i-star.webp" alt="" className="rew-img-star-size"/>
                                        <img src="/img/i-star.webp" alt="" className="rew-img-star-size"/>
                                        <img src="/img/i-star-empty.webp" alt="" className="rew-img-star-size"/>
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
                                    <span itemProp="price">{productA && Math.floor(Number(productA.price)).toLocaleString('ru-RU')}</span> ₽
                                    <meta itemProp="priceCurrency" content="RUB"/>
                                </div>
                                <FavBtn toogleFav={() => toogleFav()} prodID={Number(id)}/>
                            </div>
                        
                            
                            <div className="prod-info-button-wp">
                                <button id={productA && String(productA.product_id)}  onClick={addToCart}className="button button-prod-info"  role="button" title="Добавить товар в корзину">Добавить в корзину</button>
                            </div>
                        
                            
                            <div className="prod-info-delivery--wp">
                                <h3 className="prod-info-heading">Доставка по Москве</h3>
                                <div className="delivery-conditions-conditions">
                                    <svg width="23" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="prod-svg-cond">
                                        <path d="M8.4162 13.9658L8.00892 14.1988L2.75078 17.2066C2.21805 17.5114 1.85473 18.0439 1.76523 18.651L1 23.8427H21.3788L20.4095 18.6064C20.3019 18.0251 19.9426 17.5211 19.4282 17.2299L14.3257 14.3416L13.6619 13.9658" stroke="#7880B5" stroke-width="1.5"/>
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

                <Tabs loginStatus={loginStatus} product={productA || null} atr={attributesA || null} rews={rews || null}/>
            {/*  */}

                
            

            </div>
        
        
        </div>

    </section>
    
    
    <HitsSeaction/>
    </>
}