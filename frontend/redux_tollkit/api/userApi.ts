import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const usersApi = createApi({
    reducerPath:'usersApi',
    tagTypes:['UserInfo', 'UserOrder'],
    baseQuery:fetchBaseQuery({baseUrl:'/api/'}),
    endpoints:(build) => ({
        getUserInfo:build.query({
            query:(path) => `${path}`,
            providesTags: (result) =>
                result
                  ? [
                      ...result.map(({id}:{id:number}) => ({ type: 'UserInfo' as const, id })),
                      { type: 'UserInfo', id: 'LIST' },
                    ]
                  : [{ type: 'UserInfo', id: 'LIST' }],
        }),
        getUserOrder:build.query({
            query:(path) => `${path}`,
            providesTags: (result) =>
                result
                  ? [
                      ...result.map(({id}:{id:number}) => ({ type: 'UserOrder' as const, id })),
                      { type: 'UserOrder', id: 'LIST' },
                    ]
                  : [{ type: 'UserOrder', id: 'LIST' }],

        }),
        changeInfo:build.mutation({
            query:(body) => ({
                url:'user/:login',
                method:'PUT',
                body
            }),
            invalidatesTags: [{ type: 'UserInfo', id: 'LIST' }]
        }),
        changeUserOrder:build.mutation({
            query:({body, orderId}:{body:any, orderId:number}) => ({
                url:`order/${orderId}`,
                method:'PUT',
                body
            }),
            invalidatesTags: [{ type: 'UserOrder', id: 'LIST' }]
        })
    })
})

export const {
    useGetUserInfoQuery,
    useChangeInfoMutation,
    useGetUserOrderQuery,
    useLazyGetUserOrderQuery,
    useLazyGetUserInfoQuery,
    useChangeUserOrderMutation,
} = usersApi
export default usersApi