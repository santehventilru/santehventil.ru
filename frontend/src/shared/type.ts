export interface CartItemInertFace{
    quantity:number,
    productImage:string,
    productName:string,
    productPrice:string,
    product_id:number,
    productpath:string
}
export interface questioListInterface{
    id:string,
    headeText:string,
    mainText:string
}

export interface ProductsFavCart{
    productImage:string
    productName:string
    productPrice:string
    product_id:number
    productpath:string

}
export interface CartItemInertFace{
    quantity:number,
    productImage:string,
    productName:string,
    productPrice:string,
    product_id:number,
    productpath:string
}
export interface RewCardInterface{
    login:string,
    rating:string,
    text:string,
    review_date:string,
}

export interface modalResponse{
    message:string
    totalPrice?:number
    products:ProductsFavCart[] | CartItemInertFace[]
}

export interface FavCardProps {
    productImage: string;
    productName: string;
    productPrice: string;
    product_id: number;
    cartType: string;
    productpath: string;
    AddToCart: () => void;
    toogleFav: () => void;
}