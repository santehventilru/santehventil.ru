import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const brandsApi = createApi({
    reducerPath:'brandsApi',
    tagTypes:['Brand'],
    baseQuery:fetchBaseQuery({baseUrl:'/api/brand/'}),
    endpoints:(build) => ({
        getBrands:build.query({
            query:(path= '') => `${path}`
        })
    })
})

export const {useGetBrandsQuery} = brandsApi
export default brandsApi