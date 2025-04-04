import axios from "axios";


export const getIOrderById = async (id: number) => {
    try {
         const res = await axios.get(`/api/order/${id}`)
         return res.data
    } catch (error) {
        console.error('Ошибка поиска заказа', error)
    }
}

export const getAllOrders =  async () => {
    try {
        const  res  = await axios.get('/api/orders/all')
        return res.data
    } catch (error) {
        console.error('Ошбика получения всех заказов ', error)
    }
}