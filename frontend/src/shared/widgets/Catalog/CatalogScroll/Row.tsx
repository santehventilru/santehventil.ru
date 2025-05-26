import ProductCard from '@shared/ui/ProdcutCard'
import { ProductCardInterface } from './types';


const Row = ({productsSlice,  index, style }: {index:number, style:React.CSSProperties,productsSlice:ProductCardInterface[]} ) => (
    <div className="rowCatalog" style={style} key={index}>
        {productsSlice.map(productCard => (productCard?.product_id ?
            <ProductCard key={productCard.product_id} {...productCard} typesCard="normal"/>:
            <div></div>
         ) )}
    </div>
);

export default Row