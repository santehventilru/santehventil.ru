import { useNavigate, useParams } from "react-router-dom"
import ArrowSvg from '@pages/CatalogPage/assets/ArrowSvg.svg'

export default function SearchCatalogHeader(){

    const navigate = useNavigate()

    const {query} = useParams()

    return <section id="seacrhCatalogHeader">
        <div className="container container-ferst-mobail">
                    <div style={{display:"flex", alignItems:"center", flexWrap:'wrap'}}>
                        <button onClick={() => navigate(-1)} style={{paddingLeft:10}}>
                            <img style={{height:30, width:30}} src={ArrowSvg} alt="ArrowSvg" />
                        </button>
                        <div>
                            <h2 className="text-hd--katalog" style={{marginBottom:0}}>
                                <div id="category-name">Результат по запросу - {query}</div>
                            </h2>
                        </div>
                    </div>

                </div>
    </section>
}