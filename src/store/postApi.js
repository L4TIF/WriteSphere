import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import service from "../appwrite/appwriteConfig";

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getPosts: builder.query({
            async queryFn(query) {
                try {
                    const response = await service.listAllPost(query)
                    return { data: response.documents }
                } catch (error) {
                    return { error: { message: error.message } }
                }
            }
        })
    })
})

export const { useGetPostsQuery } = postApi;
//custom hook to get posts