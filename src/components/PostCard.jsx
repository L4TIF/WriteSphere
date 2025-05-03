
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import parse from "html-react-parser";
import { useGetPostImageQuery } from '../store/postApi';

const PostCard = ({ $id, slug, title, image, cardContent }) => {
    const { data: previewImage, isLoading, error } = useGetPostImageQuery(image);


    // console.log(content);
    // console.log(parse(content));

    return (

        <Link to={`/post/${slug}`} state={{ postId: $id }}>
            <div className="h-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className='p-2  w-full h-1/2'>
                    <img className="w-full rounded-lg h-full object-cover object-center " src={previewImage} alt="" />
                </div>
                <div className="p-5">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white truncate">{title}</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 wrap-break-word">{cardContent && cardContent + '...'}</p>
                </div>
            </div>
        </Link >
    )
}

export default PostCard