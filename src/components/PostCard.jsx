import React from 'react'
import { Link } from 'react-router-dom';
import parse from "html-react-parser";
import { useGetPostImageQuery } from '../store/postApi';

const PostCard = ({ $id, slug, title, image, cardContent }) => {
    const { data: previewImage } = useGetPostImageQuery(image);

    // console.log(content);
    // console.log(parse(content));

    return (
        <Link to={`/post/${slug}`} state={{ postId: $id }}>
            <div className="h-full bg-theme border border-theme rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className='p-2 w-full h-1/2'>
                    <img
                        className="w-full rounded-lg h-full object-cover object-center"
                        src={previewImage}
                        alt={title}
                    />
                </div>
                <div className="p-5">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-theme truncate">
                        {title}
                    </h5>
                    <p className="mb-3 font-normal text-theme/80 line-clamp-3">
                        {cardContent && cardContent + '...'}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default PostCard