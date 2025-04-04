
import PorductCard from "../Cards/ProdcutCard"
import ProdCardLoader from "../Cards/PordCardsLoader"
import { useGetProductsQuery } from "@reduxApi/productsApi"
import { ProductCard } from "src/types/interface"


export default function SaleProdSection(){


    const {data = [], isError, isLoading, isSuccess} = useGetProductsQuery('sale')
    const arr = [1,2,3,4,5,6,7,8]
    const typesCard = 'hits'


    if(isError) return <div>Ошибка загрузки</div>

    if(isLoading ) return <section id="container-sale">
    <div className="container">
        <h2 className="text-title">Товары по скидке</h2>
        <div className="wraper-sale">
            <article className="advertisement-sale">
                <img src="img/krenik-sale-img.webp" alt="" className="sale-img"/>
                <div className="wraper-sale--text">
                    <p className="text-contaner--sale">Выгодные предложения
                        продукции </p>
                    <h4 className="text-title-sale">Valtec</h4>
                    <p className="text-contaner--sale">Надежность и качество по
                        доступной цене</p>
                    <a href="/brandejs/id/1" className="link-sale">Смотреть <span className="display-none-link-sale">товары</span></a>
                </div>
            </article>
            <div className="wrap-cart-sale" id="CartSale">

                {isLoading && arr.map(() => (
                        <ProdCardLoader key={Math.random()}></ProdCardLoader>
                ))}      
                </div>
            </div>
            </div>
        </section>

    if (isSuccess)return <section id="container-sale">
    <div className="container">
        <h2 className="text-title">Товары по скидке</h2>
        <div className="wraper-sale">
            <article className="advertisement-sale">
                <img src="img/krenik-sale-img.webp" alt="" className="sale-img"/>
                <div className="wraper-sale--text">
                    <p className="text-contaner--sale">Выгодные предложения
                        продукции </p>
                    <h4 className="text-title-sale">Valtec</h4>
                    <p className="text-contaner--sale">Надежность и качество по
                        доступной цене</p>
                    <a href="/brandejs/id/1" className="link-sale">Смотреть <span className="display-none-link-sale">товары</span></a>
                </div>
            </article>
            <div className="wrap-cart-sale" id="CartSale">

                {data.length > 0 && data.map((item:ProductCard) => (
                        <PorductCard key={item.product_id} {...item} typesCard={typesCard}/>
                ))}        
            </div>
        </div>
    </div>
</section>
}