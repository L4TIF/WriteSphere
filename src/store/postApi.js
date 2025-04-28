import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import service from "../appwrite/appwriteConfig";

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        // to list app the posts
        getPosts: builder.query({
            async queryFn(query) {
                try {
                    const response = await service.listAllPost(query)
                    return { data: response.documents }
                } catch (error) {
                    return { error: { message: error.message } }
                }
            },
            providesTags: ['post'],
        }),

        //to fetch single post
        getPostByID: builder.query({
            async queryFn(id) {
                try {
                    const response = await service.getPost(id);
                    return { data: response }
                } catch (error) {
                    return { error: { message: error.message } }
                }
            },
            providesTags: (result, error, id) => [{ type: "Posts", id }],
        })
    })


})

export const { useGetPostsQuery, useGetPostByIDQuery } = postApi;
//custom hook to get posts