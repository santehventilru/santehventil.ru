import BtnDeleteFav from "./BtnDeleteFav"
import { Link } from "react-router-dom"
import { Trascription } from "@shared/utils/Transcription"
import { FavCardProps } from "@shared/type"
import SvgMagni from '@shared/assets/svg/SvgMagni.svg'
import SvgCart from '@shared/assets/svg/SvgCart.svg'


export default function FavCard({productImage,productName,productPrice, product_id, cartType, productpath, AddToCart, toogleFav}:FavCardProps){


    const nameEn  = Trascription.toTranscription(productName.split(' ').join('-'))
    const productPath = Trascription.toTranscription(productpath.split(' ').join('-'))


    return <div className={ `${cartType === 'no-modal' ? 'kozina-cart-wp-page ': 'kozina-cart-wp'}`} id={String(product_id)}>
        <div className='basket-pop-item-ferst'>
        <Link to={`/productpage/${product_id}/${productPath}/${nameEn}`} className='basket-photo-item'>
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

            <button className="nav-cart-cont nav-cart-cont-basket" onClick={AddToCart}>
                    <img className="svg-corzina" src={SvgCart} alt="cartSvg"/>
            </button>
            
            <Link className="nav-cart-cont" to={`/productpage/${product_id}/${productPath}/${nameEn}`}>
               <img className="svg-lups" src={SvgMagni} alt="Magnivg"/>
            </Link>
            <BtnDeleteFav toogleFav={ () => toogleFav()}/>
            </div>
        </div>
    </div>
}