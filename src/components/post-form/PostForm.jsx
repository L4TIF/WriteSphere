import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE, Container } from '../index'
import service from '../../appwrite/appwriteConfig'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useCreateNewPostMutation, useGetPostImageQuery, useUpdatePostMutation } from '../../store/postApi'


const PostForm = ({ post }) => {

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active'

        }
    })
    const [addPost, addPostState] = useCreateNewPostMutation(); //addpost hook
    const [updatePost, updatePostState] = useUpdatePostMutation(); //updatePost hook
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);
    const { data: previewImage, ...previewImageStatus } = useGetPostImageQuery(post?.image)

    const submit = async (data) => {
        //updating post
        if (post) {
            const { data: dbPost } = await updatePost({ post, data })
            if (dbPost) navigate(`/post/${dbPost.slug}`, { state: { postId: dbPost.$id } })
        }
        // creating post
        else {
            const { data: dbPost } = await addPost({ data, userId: userData.$id })
            if (dbPost) navigate(`/post/${dbPost.slug}`, { state: { postId: dbPost.$id } })
        }
    }

    const slugTransform = useCallback((value) => {

        if (value && typeof value === 'string')
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
                .replace(/\s+/g, '-') // Replace spaces with dashes
                .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes
        return ''
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title,
                    { shouldValidate: true }))
            }
        })


        return () => {
            subscription.unsubscribe()
        }

    }, [watch, slugTransform, setValue])

    if (addPostState.isLoading) return <Container>Adding Post...</Container>
    if (updatePostState.isLoading) return <Container>Updating Post...</Container>
    if (addPostState.error || updatePostState.error) return <Container>something went wrong</Container>
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        {previewImageStatus?.isLoading && <p>Image Loading...</p>}
                        <img
                            src={previewImage}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full cursor-pointer">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm