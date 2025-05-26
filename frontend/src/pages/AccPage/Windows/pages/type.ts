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

export interface OrderMoreInfoInterface{
    items:OrderProductInterface[],
    payment:string,
    total_price:string,
    delivery_type:string,
    delivery_address:string,
    delivery_price?:string
}

export interface UserInfo {
    first_name?: string;
    last_name?: string;
    login?: string;
    email?: string;
    phone?: string;
    address?:string,
    id?:number
}

export interface OrderProductInterface{
    filename:string,
    name:string,
    price:string,
    product_id:number, 
    quantity:number,
}