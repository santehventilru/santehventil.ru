import axios from "axios";


export interface RewAddInterface{
    product_id:number,
    login:string,
    text:string,
    review_date:string,
    rating:number
}

export const getAllRewApi = async () => {
    try {
        const res  = await axios.get('/api/reviews/all')
        return res.data
    } catch (error) {
        console.error('Error rew get', error)
    }
}

export const rewAdd = async (data:RewAddInterface) => {
    try {
        const res = await axios.post('/api/reviews',{
            ...data
        })
        return res.data
    } catch (error) {
        console.error('Ошбика отправки', error)
    }
}