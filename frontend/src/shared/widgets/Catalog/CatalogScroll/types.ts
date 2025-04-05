import { FixedSizeListProps } from "react-window";

export type StickyListProps = Omit<FixedSizeListProps, "children" | "itemData"> & {
    loadMore: () => void;
    children: React.ComponentType<RowProps>;
    products:ProductCardInterface[];
    hasMore:boolean;
    itemsPerRow:number;
    productsLength:number
};
export interface ProductCardInterface {
    product_id: number, 
    name:string, 
    price: string,
    main_image: string,
    sku: string,
    disc:string,
    final_price:string,
    typesCard:string,
    productpath:string
}
export type RowProps = {
    index: number;
    style: React.CSSProperties;
    productsSlice:ProductCardInterface[]
};