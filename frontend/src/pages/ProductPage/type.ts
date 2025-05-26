export interface AttributeProduct{
    attribute_name: string, 
    value:string,
}

export interface PorductItemWayInterface{
    category_name: string,
    id:number
}
export interface ImageProductPage{
    add_image:string
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
export interface ProductDataInterface{
    categories:PorductItemWayInterface[]
    productImages:ImageProductPage[]
    product:PorductFromProdPage
    attributes:AttributeProduct[]

}