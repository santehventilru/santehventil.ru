import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ProdCardLoader(){
 return <article className='cart-wrapper cart-wrapper-catalog wp-sale span-none'>
                    
                    <div className="cart catalog-cart">
                        
    
                        
                        
                        <div className="cart--sale">
                            <Skeleton  width={40} height={20} className={'loader-1'} />
                            <Skeleton  width={40} height={20} className={'loader-1'} />
                        </div>
                        
    
                        
                        <a href="/product/santeh/id/${product_id}" className="wrapper-tover--ref">
                            <div className="img-tover-center">
                                <Skeleton width={200} height={150} className={'loader-2'}/>
                            </div>
                            <div className="cart--descr">
                                <Skeleton width="80%" height={20} />
                            </div>
                        </a>
                    </div>
    
                    <div className="container-art-cost">
                        <Skeleton width={100} height={20} className={'loader-1'}/>
                        <div className="text-cost">
                            <Skeleton width={60} height={20} className={'loader-1'}/>
                            <meta itemProp="priceCurrency" content="RUB"/>
                            
                        </div>
                    </div>
                </article>

}