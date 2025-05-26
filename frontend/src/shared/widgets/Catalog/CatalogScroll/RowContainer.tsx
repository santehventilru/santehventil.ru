import InfiniteScroll from "@shared/components/InfiniteScroll";
import { useMemo } from "react";
import { ProductCardInterface, RowProps } from "./types";

const ItemWrapper: React.FC<{
    data: {
      ItemRenderer: React.ComponentType<RowProps>;
      itemCount: number;
      loadMore: () => void;
      products: ProductCardInterface[];
      hasMore: boolean;
      itemsPerRow: number;
      productsLength:number
    };
    index: number;
    style: React.CSSProperties;
  }> = ({ data, index, style }) => {
    const { ItemRenderer, products, hasMore, itemsPerRow, loadMore, productsLength} = data;

    const productGroups = useMemo(() => {
      const groups = [];
      for (let i = 0; i < productsLength; i += itemsPerRow) {
        groups.push(products.slice(i, i + itemsPerRow));
      }
      return groups;
    }, [products, itemsPerRow]);

    
    if (hasMore && index === productGroups.length) {
      return <InfiniteScroll loadMore={loadMore} style={style} />;
    }
  
    if (index >= productGroups.length) {
      return null;
    }
  
    return (
      <ItemRenderer 
        productsSlice={productGroups[index]} 
        index={index}
        style={style}
      />
    );
  };

export default ItemWrapper