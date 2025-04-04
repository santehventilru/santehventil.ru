import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const rewsApi = createApi({
    reducerPath:'rewsApi',
    tagTypes:['Rews'],
    baseQuery:fetchBaseQuery({baseUrl:'/api/'}),
    endpoints:(build) => ({
        getRew:build.query({
            query:() => 'reviews/all',
            providesTags: (result) =>
                result
                  ? [
                      ...result.map(({id}:{id:number}) => ({ type: 'Rews' as const, id })),
                      { type: 'Rews', id: 'LIST' },
                    ]
                  : [{ type: 'Rews', id: 'LIST' }],
        }),
        postRew:build.mutation({
            query:(body) => ({
                url:'reviews',
                method:'POST',
                body
            }),
            invalidatesTags: [{ type: 'Rews', id: 'LIST' }]
        })
    })
})

export const {useGetRewQuery, usePostRewMutation} = rewsApi
export default rewsApi