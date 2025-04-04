import { createApi, fetchBaseQuery, retry} from '@reduxjs/toolkit/query/react'


const produtsApi  = createApi({
    reducerPath:'productsApi',
    tagTypes:['Product', 'SubCategory'],
    baseQuery:retry(
        fetchBaseQuery({baseUrl:'/api/',}),
        {maxRetries:5}
    ),
    endpoints:(build) => ({
        getProducts:build.query({
            query: (path = '') => `products/${path}`
        }),
        getSubCategory:build.query({
            query:(path ='') => `${path}`,
            extraOptions:{},
            providesTags: (result) =>
                result
                  ? [
                      ...result.map(({id}:{id:number}) => ({ type: 'SubCategory' as const, id })),
                    { type: 'SubCategory', id: 'LIST' },
                    ]
                  : [{ type: 'SubCategory', id: 'LIST' }],
        })
    }),


})

export const { 
    useGetProductsQuery,
    useLazyGetProductsQuery, 
    useGetSubCategoryQuery } = produtsApi 
export default produtsApi
// router.get('/api/products/id/:id', productController.getProductById);
// router.get(`/api/products/hits`, productController.getHistProducts)//hits;
// router.get(`/api/products/sale`, productController.getSaleProducts)
// router.get('/api/products/catalog', productController.productByCatalog)