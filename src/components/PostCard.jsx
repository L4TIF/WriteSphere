import React from 'react'
import { Link } from 'react-router-dom';
import { useGetPostImageQuery } from '../store/postApi';

const PostCard = ({ $id, slug, title, image, cardContent }) => {
    const { data: previewImage } = useGetPostImageQuery(image);

    return (
        <div className='w-full h-full bg-theme/5 dark:bg-theme/50 rounded-xl p-4 shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-y-1 cursor-pointer flex flex-col'>
            <Link to={`/post/${slug}`} state={{ postId: $id }} className="flex flex-col flex-grow">
                <div className='w-full aspect-video mb-4 overflow-hidden rounded-lg'>
                    <img
                        src={previewImage}
                        alt={title}
                        className='w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105'
                    />
                </div>
                <h2 className='text-xl font-bold mb-3 text-theme dark:text-theme/90 group-hover:text-primary transition-colors duration-200 line-clamp-2'>{title}</h2>
                <p className='text-theme/70 dark:text-theme/80 mb-4 line-clamp-3 flex-grow'>{cardContent}</p>
            </Link>
        </div>
    )
}

export default PostCard