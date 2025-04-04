

export interface ProductCard {
    product_id: number, 
    name:string, 
    price: string,
    main_image: string,
    sku: string,
    disc:string,
    final_price:string,
    typesCard:string  
    productpath:string   
}

export interface RewCardInterface{
    login:string,
    rating:string,
    text:string,
    review_date:string,
}

export interface BrandCardInterface{
    name:string,
    filename:string,
    brand_id:number,
}

export interface PorductItemWayInterface{
    category_name: string,
    id:number
}

export interface CartItemInertFace{
    quantity:number,
    productImage:string,
    productName:string,
    productPrice:string,
    product_id:number,
    productpath:string
    
}

export interface ImageProductPage{
    add_image:string
}

export interface AttributeProduct{
    attribute_name: string, 
    value:string,
}

export interface PorductFromProdPage{
    product_id: number, 
    name:string, 
    price: string,
    main_image: string,
    sku: string,
    disc:string,
    final_price:string,
    description: string, 
}

export interface FilterInfoResponse {
    countProd: string;
    min_price: number;
    max_price: number;
    category_name: string;
}

export interface SubCatalogItem{
    id: number, 
    category_name : string, 
    categoryPath: string ,
    linkPath:string
}

export interface getProdictPagination{

}
export interface FilterItemInterface{
    value:string, 
    product_count:string,
    attribut:string
}
export interface FilterBlockInterface{
    attribut:string, 
    filetBlockList:FilterItemInterface[]
}
export interface FiltersArrInterface{
    attribute: string,
    values: string[]
}

export interface OrderProductInterface{
    filename:string,
    name:string,
    price:string,
    product_id:number, 
    quantity:number,
}
export interface orderInterFace{
    delivery_time: string | null,
    delivery_type: string,
    order_date: string,
    order_id: number, 
    status:string, 
    payment:string,
    total_price:string,
    profile_id?:number,
    delivery_address:string,
    items:OrderProductInterface[]
    delivery_price?:string
}
