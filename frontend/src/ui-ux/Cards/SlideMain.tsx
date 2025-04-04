import { Link } from "react-router-dom"



export default function SlideMain({idSlider ,textHeader, textSlider, path, imgRef}:{idSlider:string, textHeader:string, textSlider:string, path:string, imgRef:string}){


    return <div className="slider-art bg-img-romo" id={idSlider}  data-bg={imgRef} style={{backgroundImage:`url('${imgRef}')`}}>
                <div className="pormo-contnet--container">
                    <h2 className="promo-text--title">{textHeader}</h2>
                    {textSlider
                        .split('/')
                        .map((text, index) => <p  key={text + String(index)} className="promo-text">{text}</p>)
                    }
                </div>
                <Link className="button button-promo" to={path}>Смотреть каталог</Link>
            </div>
}