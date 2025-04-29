
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import service from '../appwrite/appwriteConfig';
import { useGetPostImageQuery } from '../store/postApi';

const PostCard = ({ $id, slug, title, image }) => {
    const { data: previewImage, isLoading, error } = useGetPostImageQuery(image);

    return (
        <Link to={`/post/${slug}`} state={{ postId: $id }}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    {isLoading && <p>Image Loading...</p>}
                    <img className='rounded-xl' src={previewImage && previewImage} alt={title} />

                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link >
    )
}

export default PostCard