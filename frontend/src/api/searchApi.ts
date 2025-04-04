import axios from "axios";

export const getPopulatProdutsApi = async () => {
    try {
        const res = await axios.get('/api/producthits')
        return res.data
    } catch (error) {
        console.error('Ошибка запроса', error)
        return false
    }
}

export const getPopulatProdutsApi2 = async () => {
    try {
        const res = await axios.get('/api/producthits')
        return res.data
    } catch (error) {
        console.error('Ошибка запроса', error)
        return false
    }
}


export const getBrandsOfShApi = async () => {
    try {
        const res = await axios.get('/api/product/filter/hits')
        return res.data
    } catch (error) {
        console.error('Ошибка запроса', error)
        return false
    }
}


export const getSeachResultApi = async ( item:string, offset:number) => {
   
    try {
        const res  =  await axios.get(`/api/search/${item}??limit=16&offset=${offset}`)
        return res.data
    } catch (error) {
        console.error('Продуктов нет', error)
        return false
    }
}