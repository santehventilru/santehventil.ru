import { useDispatch } from "react-redux"
import BtnDeleteFav from "../CartCp/BtnDeleteFav"
import { AppDispatch } from "../../../redux_tollkit/store/store"
import { addToCartApi } from "../../api/cart/cartApi"
import { plusCartCount } from "../../../redux_tollkit/slices/cartSlice"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { Trascription } from "../../funcHelper/Transcription"



export default function FavCard({productImage,productName,productPrice, product_id, cartType, productpath}
    :{productImage:string,productName:string, productPrice:string,product_id:number, cartType:string, productpath:string }){


    const dispatch = useDispatch<AppDispatch>()

    const nameEn  = Trascription.toTranscription(productName.split(' ').join('-'))
    const productPath = Trascription.toTranscription(productpath.split(' ').join('-'))


    const addToCart = async () => {
            try {
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

    return <div className={ `${cartType === 'no-modal' ? 'kozina-cart-wp-page ': 'kozina-cart-wp'}`} id={String(product_id)}>
        <div className='basket-pop-item-ferst'>
        <Link to={`/productpage/${product_id}/${nameEn}`} className='basket-photo-item'>
            <img src={productImage} alt={productName} className='photo-basket-item-size' loading="lazy"/>
        </Link>
        <div className="kozina-cart-item">{productName}</div>
        <div className="kozina-button-wp fav-btn-wp-flex">
            
            
        </div> 
        </div>
        
        <div className='basket-pop-item-second' style={{justifyContent:'space-between'}}>

            <div style={{}}>
                Цена: {Math.floor(Number(productPrice)).toLocaleString('ru')}₽
            </div>

            <div style={{display:'flex', alignItems:'center', gap:10}}>

            <button className="nav-cart-cont nav-cart-cont-basket" onClick={addToCart}>
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="#7880B5" xmlns="http://www.w3.org/2000/svg" className="svg-corzina">
                        <path d="M14.3682 16.8745L8.31499 16.8745C5.73077 16.8745 3.62834 14.7721 3.62834 12.1879L3.62834 7.38404C3.62834 4.98174 2.43098 2.75812 0.425444 1.43578C0.0652751 1.19832 -0.03416 0.71388 0.203297 0.353711C0.440754 -0.0064969 0.925158 -0.105971 1.28541 0.131564C2.43028 0.886427 3.35909 1.88203 4.02327 3.0283C4.1668 3.1891 5.32416 4.41583 7.22148 4.41583L16.2162 4.41583C18.6702 4.36993 20.591 6.83265 19.9494 9.20136L18.914 13.3283C18.3901 15.4163 16.5208 16.8745 14.3682 16.8745ZM4.99348 5.53675C5.12334 6.13669 5.19056 6.75528 5.19056 7.38404L5.19056 12.1879C5.19056 13.9107 6.59218 15.3123 8.31499 15.3123L14.3682 15.3123C15.8033 15.3123 17.0495 14.3401 17.3987 12.9482L18.4341 8.8212C18.8154 7.41372 17.6739 5.95082 16.2162 5.97804L7.22144 5.97804C6.36335 5.97804 5.61645 5.79304 4.99348 5.53675ZM7.92443 19.0226C7.92443 18.4833 7.48729 18.0462 6.94805 18.0462C5.6525 18.0978 5.65364 19.9479 6.94805 19.9989C7.48729 19.9989 7.92443 19.5618 7.92443 19.0226ZM15.6965 19.0225C15.6965 18.4833 15.2593 18.0462 14.7201 18.0462C13.4245 18.0978 13.4257 19.9479 14.7201 19.9989C15.2593 19.9989 15.6965 19.5618 15.6965 19.0225ZM16.9973 8.32137C16.9973 7.88996 16.6476 7.54026 16.2162 7.54026L7.53388 7.54026C6.49751 7.5815 6.49829 9.06158 7.53388 9.10248L16.2162 9.10248C16.6476 9.10248 16.9973 8.75277 16.9973 8.32137Z" />
                    </svg>
            </button>
            
            <Link className="nav-cart-cont" to={`/productpage/${product_id}/${nameEn}/${productPath}`}>
                <svg width="21" height="20" viewBox="0 0 21 20" fill="#7880B5" xmlns="http://www.w3.org/2000/svg" className="svg-lups">
                    <g clip-path="url(#clip0_203_1042)">
                    <rect x="0.078125" y="-0.00439453" width="19.9913" height="20" fill="#252525"/>
                    <path d="M14.6439 15.9978C10.6487 19.1814 5.0638 18.3005 2.1056 14.6492C-0.749577 11.1241 -0.571012 6.03872 2.52642 2.82017C5.72686 -0.505158 10.7585 -0.949076 14.406 1.77874C15.7128 2.75586 16.6887 3.99895 17.3243 5.50365C17.9636 7.01709 18.1578 8.59172 17.9361 10.2157C17.7151 11.8321 17.0702 13.2725 16.0206 14.6168C16.1055 14.6723 16.1961 14.7123 16.261 14.7772C17.4148 15.926 18.5642 17.0792 19.7181 18.228C19.9915 18.5003 20.1276 18.8174 20.0465 19.1995C19.8854 19.96 18.9801 20.2535 18.3994 19.7315C18.1272 19.4874 17.8768 19.2183 17.6183 18.9598C16.6706 18.0126 15.7234 17.0649 14.7757 16.1177C14.7363 16.0803 14.6951 16.0453 14.6439 15.9978ZM16.0312 8.98194C16.0412 5.12217 12.9251 2.00163 9.05655 1.99601C5.19866 1.9904 2.085 5.08596 2.06814 8.94323C2.05128 12.8124 5.1612 15.9416 9.04157 15.9598C12.8839 15.9779 16.0212 12.8455 16.0312 8.98194Z" />
                    </g>
                </svg>
            </Link>
            <BtnDeleteFav product_id={product_id}/>
            </div>
        </div>
    </div>
}