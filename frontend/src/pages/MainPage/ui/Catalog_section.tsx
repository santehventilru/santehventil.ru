import {Link} from 'react-router-dom'

export default function CatlogSection(){
    return  <section id="catalog" >
    <div className="container container-catalog">
        <h2 className="text-title">Каталог</h2>
        <div className="wrapper-catalog">
            <Link className="catalog-item" to="/product/8-otoplenie">
                <h3 className="text-title--catalog dop">Отопление</h3>
                <div className="catalog-wrapper-img">
                    <img src="img/otoplenie-img.png" alt="" className="img-catalog" loading="lazy"/>
                </div>
                <div  className="link-catalog">подробнее</div>
            </Link>
            <Link className="catalog-item" to="/product/5-santex">
                <h3 className="text-title--catalog">Сантехника</h3>
                <div className="catalog-wrapper-img">
                    <img src="img/santex-img.png" alt="" className="img-catalog" loading="lazy"/>
                </div>
                
                <div  className="link-catalog">подробнее</div>
            </Link>
            <Link className="catalog-item" to="/product/165-santex">
                <h3 className="text-title--catalog">Инструменты</h3>
                <div className="catalog-wrapper-img">
                    <img src="img/drell-instum-img.png" alt="" className="img-catalog" loading="lazy"/>
                </div>
                
                <div  className="link-catalog">подробнее</div>
            </Link>
            <Link className="catalog-item" to="/product/171-santex">
                <h3 className="text-title--catalog">Для дачи и сада</h3>
                <div className="catalog-wrapper-img">
                    <img src="img/dlya-dachi-img.png" alt="" className="img-catalog" loading="lazy"/>
                </div>
                
                <div  className="link-catalog">подробнее</div>
            </Link>
        </div>
    </div>
</section>
}