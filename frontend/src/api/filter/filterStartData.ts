import axios from "axios";
import { FilterInfoResponse } from "../../types/interface";
import {parseCategoryPath} from '../../funcHelper/ParseCategoryPath'

// import React, {useParams} from "react";


export const getFilterCategory = async (path: string): Promise<FilterInfoResponse | null> => {
    try {
        const res = await axios.get(`/api/categoriesInfo?categoryPath=${encodeURIComponent(path)}`);
        const data = res.data;

        
        return {
            countProd: data.result[0].count_prod, 
            min_price: Math.round(data.result[0].min_price), 
            max_price: Math.round(data.result[0].max_price),
            category_name: data.CategoryName[0].category_name,
        };
    } catch (error) {
        console.error('Error fetching category data:', error);
        return null; 
    }
};


export const getSubCategory = async (path: string) =>{
    
            const categoryIds = parseCategoryPath(path);  
            const categoryId = categoryIds[categoryIds.length - 1];      
            
                try {
                    const res  = await axios.get(`/api/suBcategories/${categoryId}`)
                    
                    const data  = await res.data
                     
                     return {data :data}
                } catch (error:any) {
                    console.error('Ошибка получения подкатегорий:', error);
                    return { error: error.message };
                    
                }
}

export const getFilterAtribute = async (path: string) => {
    const categoryIds = parseCategoryPath(path);  
    const categoryId = categoryIds[categoryIds.length - 1];
    const NoFilterAtribute  = [5, 8]
    if(!NoFilterAtribute.includes(categoryId)){
        try {
        
            const res  =  await axios.get(`/api/attribute/${categoryId}`)
            return {attributsList : res.data}
        } catch (error: any) {
            console.error('Ошибка получения атрибутов филтра:', error);
            return { error: error.message };
        }
    }

    
}
    
