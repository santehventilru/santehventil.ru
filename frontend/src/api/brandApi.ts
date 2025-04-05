 
import axios from "axios";
import { FiltersArrInterface } from "@shared/widgets/Catalog/Filter/type";
import { parseCategoryPath } from "@shared/utils/ParseCategoryPath";



export const brandProductsApi = async ({name}:{name:string}) => {
    try {
        const res  = await axios.get(`/api/brandname/${name}`)
        return res.data
    } catch (error) {
        console.error('Ошибка получения информации о бренеде', error)
    }
}





export const getFilterBrand = async (brandId :string, path: string) => {
    const categoryIds = parseCategoryPath(path);  
    const categoryId = categoryIds[categoryIds.length - 1];
    console.log(categoryId)
    if(String(categoryId) !== brandId){
       const categoryPath = `categoryId=${categoryId}`
    
    const NoFilterAtribute  = [5, 8]
    if(!NoFilterAtribute.includes(categoryId)){
        try {
        
            const res  =  await axios.get(`/api/brand/attribute/${brandId}?${categoryPath}`)
            return {attributsList : res.data}
        } catch (error: any) {
            console.error('Ошибка получения атрибутов филтра:', error);
            return { error: error.message };
        }
    }
}

    
}


export const ProductBrand  = async ({brand_name, offset, path, filters = []}:{brand_name :string,offset: number, path: string, filters: FiltersArrInterface[] | []}) => {

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
        console.log(brand_name)
        console.log(queryString)


        const res  =  await axios.get(`/api/brand/${brand_name}/categories?${queryString}`)
        // console.log(path)
        // console.log(queryString)
        // console.log(res)
        return res.data
    } catch (error) {
        console.error('Error fetching carts:', error);
    }
}

// export const brandSubCat  = async () => {
//     try {
//         const res  =  await axios.get('')
//     } catch (error) {
        
//     }
// }