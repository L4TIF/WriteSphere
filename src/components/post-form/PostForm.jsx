import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE, Container } from '../index'
import service from '../../appwrite/appwriteConfig'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useCreateNewPostMutation, useGetPostImageQuery, useUpdatePostMutation } from '../../store/postApi'
import parseHTMLtoText from '../../utils/htmlParser'
import Loader from '../Loader'

const PostForm = ({ post }) => {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active'
        }
    })
    const [addPost, addPostState] = useCreateNewPostMutation();
    const [updatePost, updatePostState] = useUpdatePostMutation();
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);
    const { data: previewImage, ...previewImageStatus } = useGetPostImageQuery(post?.image)

    const submit = async (data) => {
        data.cardContent = parseHTMLtoText(data.content).replace(/\n/g, ' ').trim().slice(0, 50);

        if (post) {
            const { data: dbPost } = await updatePost({ post, data, authorName: userData.name })
            if (dbPost) navigate(`/post/${dbPost.slug}`, { state: { postId: dbPost.$id } })
        } else {
            const { data: dbPost } = await addPost({
                data,
                userId: userData.$id,
                authorName: userData.name
            })
            if (dbPost) navigate(`/post/${dbPost.slug}`, { state: { postId: dbPost.$id } })
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string')
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/^-+|-+$/g, '');
        return ''
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title, { shouldValidate: true }))
            }
        })
        return () => subscription.unsubscribe()
    }, [watch, slugTransform, setValue])

    if (addPostState.isLoading || updatePostState.isLoading) return (
        <div className="min-h-[60vh]">
            <Loader size="lg" text={post ? "Updating post..." : "Creating post..."} />
        </div>
    )

    if (addPostState.error || updatePostState.error) return <Container>Something went wrong</Container>

    return (
        <form onSubmit={handleSubmit(submit)} className="md:flex flex-wrap w-full">
            <div className="md:w-2/3 px-2">
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
                <RTE
                    className="w-fit"
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="md:w-1/3 px-2">
                <div className="mb-4">
                    <label className="block mb-1 pl-1 text-theme">Featured Image :</label>
                    <input
                        type="file"
                        className="w-full px-3 py-2 rounded-lg
                            bg-theme border border-theme
                            text-theme file:mr-4 file:py-2 file:px-4
                            file:rounded-lg file:border-0
                            file:text-sm file:font-semibold
                            file:bg-primary file:text-white
                            hover:file:bg-primary/90
                            cursor-pointer
                            focus:outline-none focus:ring-2 focus:ring-primary
                            transition-colors duration-200"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                </div>
                {post && (
                    <div className="w-full mb-4">
                        {previewImageStatus?.isLoading ? (
                            <div className="relative h-48">
                                <Loader size="md" text="Loading image..." />
                            </div>
                        ) : (
                            <img
                                src={previewImage}
                                alt={post.title}
                                className="rounded-lg w-full h-auto"
                            />
                        )}
                    </div>
                )}
                <div className="mb-4">
                    <label className="block mb-1 pl-1 text-theme">Status :</label>
                    <select
                        className="w-full px-3 py-2 rounded-lg
                            bg-theme border border-theme
                            text-theme
                            focus:outline-none focus:ring-2 focus:ring-primary
                            transition-colors duration-200"
                        {...register("status", { required: true })}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500 hover:bg-green-600" : "bg-blue-600 hover:bg-blue-700"}
                    className="w-full"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm