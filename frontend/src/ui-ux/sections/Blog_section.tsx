import { Link } from "react-router-dom"

export default function BlogSection(){
    return  <section id="Blog">

                <div className="container">
                    <h2 className="text-title">Интересно узнать</h2>
                    
                    <div className="wrapper-blog">
                        <div className="wrapper-blog--layer1">
                            <div className="blog-item-big blog-bg-1">
                                <div className="wrapper-imet-lr1-big">
                                    <h3 className="text-blog--big">Как выбрать идеальную ванну: формы, функции, удобство.
                                        </h3>
                                    <Link to='/article/1' className="links-blog">смотреть</Link>
                                </div>
                            </div>
                            <div className="blog-item  blog-bg-2">
                                <div className="wrapper-imet-lr1">
                                    <p className="text-blog--big">Фильтры для воды
                                        и какой лучше</p>
                                    <Link to='/article/2' className="links-blog">смотреть</Link>
                                </div>
                            </div>
                        </div>
                        <div className="wrapper-blog--layer2">
                            <div className="blog-item  blog-bg-3">
                                <div className="wrapper-imet-lr2">
                                    <p className="text-blog--big">Фильтры для воды
                                        и какой лучше</p>
                                    <Link to='/article/3' className="links-blog">смотреть</Link>
                                </div>
                            </div>
                            <div className="blog-item-big  blog-bg-4">
                                <div className="wrapper-imet-lr2-big">
                                    <p className="text-blog--big">Тренды интерьера и какой себе выбрать</p>
                                    <Link to='/article/4' className="links-blog">смотреть</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

</section>
}