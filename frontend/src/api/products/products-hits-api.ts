import axios from "axios"
import { FiltersArrInterface } from "../../types/interface";

// export const getProductHit = async () =>{
//     try {
//         const res  = await axios.get(`/api/producthits?device=${Date.now()}`)
        
//         return res.data
//     } catch (error) {
//         console.error('Error fetching studios:', error);
//     }
// }

export const getProductSale = async () => {
    try {
        const res  = await axios.get('/api/productsale')
        return res.data
    } catch (error) {
        console.error('Error fetching studios:', error);
    }
}

export const getProdByCatalog = async ({offset, path, filters = []}:{offset: number, path: string, filters: FiltersArrInterface[] | []}) => {

    const sortBy = 'price'; // Или любое другое поле для сортировки
    const sortOrder = 'ASC'; // Или 'DESC'
    
        // Преобразование фильтров в нужный формат
    const filterParams :FiltersArrInterface[] = filters.map(filter => ({
        attribute: filter.attribute ,
        values: filter.values
    }));

    try {
        const queryString = new URLSearchParams({
            categoryPath: encodeURIComponent(path),
            limit: String(16),
            offset: String(offset || 0),
            sortBy,
            sortOrder,
            filters: JSON.stringify(filterParams) 
        }).toString();


        const res  =  await axios.get(`/api/categories?${queryString}`)
        return res.data
    } catch (error) {
        console.error('Error fetching carts:', error);
    }
}


// export const getPorudctPageInfo  = async (id:number) => {
//     try {
//         const res  = await axios.get(`/api/product/santeh/id/${id}`)
//         console.log(res.data)
//         return res.data
//     } catch (error) {
//         console.error('Error fetching category data:', error);
//         return null;
//     }
// }

    
      