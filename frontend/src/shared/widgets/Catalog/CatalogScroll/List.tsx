import { FixedSizeList as List } from "react-window";
import { StickyListProps } from "./types";
import ItemWrapper from "./RowContainer";



const StickyList: React.FC<StickyListProps> = ({ children, loadMore, products,hasMore,itemsPerRow,productsLength,  ...rest  }) => {

    const rowCount = Math.ceil(products.length / itemsPerRow) + (hasMore ? 1 : 0);

  
    return <List
      style={{scrollbarWidth:'none'}}
      itemData={{
        ItemRenderer: children,
        itemCount: rowCount,
        loadMore,
        products,
        hasMore,
        itemsPerRow,
        productsLength,
      }}
      {...rest}
    >

        {ItemWrapper}
 
    </List>
  };

  export default StickyList




