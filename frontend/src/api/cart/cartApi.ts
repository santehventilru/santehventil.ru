import axios from "axios";

export const  getCartApi = async () => {
    try {
        const res  = await axios.get('/api/cart')
        return res.data
    } catch (error) {
        console.error('Error fetching cart data:', error);
        return null;
    }
}

export const addToCartApi  = async (product_id:number) => {
    try {
        const res = await axios.post('/api/addtocart',{
            products: [{product_id, quantity: 1}],
            delivery_type: 'Доставка'
        },{
            headers:{
                'Content-Type': 'application/json'
            }
        })
        return res.data
    } catch (error) {
        console.error('Error fetching cart data:', error);
        return null;
    }
}


export const changeQuanApi = async (id:number, quantity:number) => {
    try {
        const res  = await axios.post(`/api/cart/updatequantity/${id}`,{
            quantity
        },{
            headers:{
                'Content-Type': 'application/json'
            }
        })
        return res.data
    } catch (error) {
        console.error('Error fetching cart data:', error);
        return null;
    }
}


export const deleteProdcutCartApi = async (id: number) => {
    try {
        const res = await axios.delete(`/api/cart/delete/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error deleting product from cart:', error);
        return null;
    }
};