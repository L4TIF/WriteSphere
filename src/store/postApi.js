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

        getPostImage: builder.query({
            async queryFn(imageId) {
                try {
                    const image = await service.getFilePreview(imageId);
                    return { data: image }
                } catch (error) {
                    return { error: { message: error.message } }
                }
            },
            providesTags: (result, error, id) => [{ type: "image", id }],
        }),

        //to fetch single post
        getPostByID: builder.query({
            async queryFn(id) {
                try {
                    if (id) {
                        const response = await service.getPost(id)
                        return { data: response }
                    }
                } catch (error) {
                    return { error: { message: error.message } }
                }
            },
            providesTags: (result, error, id) => [{ type: "Posts", id }],
        }),

        // create new post
        createNewPost: builder.mutation({
            async queryFn(args) {
                const { data, userId } = args;
                try {
                    const file = await service.uploadFile(data.image[0]);
                    if (file) {
                        const fileId = file.$id
                        data.image = fileId
                        const dbPost = await service.createPost({
                            ...data,
                            userId
                        })
                        return { data: dbPost }
                    }
                } catch (error) {
                    return { error: { message: error.message } }
                }
            },
            invalidatesTags: ['post']
        }),

        //update posts
        updatePost: builder.mutation({
            async queryFn(args) {
                const { post, data } = args;
                try {

                    const file = data.image[0] ? await service.uploadFile(data.image[0]) : null
                    if (file) {
                        console.log(file, post);
                        await service.deleteFile(post.image)
                    }
                    const dbPost = await service.updatePost(post.$id, { ...data, image: file ? file.$id : undefined })
                    return { data: dbPost }

                } catch (error) {
                    return { error: { message: error.message } }
                }
            },
            invalidatesTags: (result, error, { id }) => [{ type: "Posts", id }, 'post', { type: "image", id }],

        }),

        //delete post
        deletePost: builder.mutation({
            async queryFn(post) {
                try {
                    const res = await service.deletePost(post.$id);
                    if (res) {
                        const result = await service.deleteFile(post.image);
                        return { data: result }
                    }

                    return { error: { message: "error delete post" } }

                } catch (error) {
                    return { error: { message: error.message } }
                }
            },
            invalidatesTags: (result, error, { id }) => ['post'],

        }),



    })


})

export const { useGetPostsQuery, useGetPostByIDQuery, useCreateNewPostMutation, useUpdatePostMutation, useDeletePostMutation, useGetPostImageQuery } = postApi;
//custom hook to get posts