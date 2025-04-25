
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import service from '../appwrite/appwriteConfig';

const PostCard = ({ $id, title, image }) => {


    const [previewImage, setPreviewImage] = useState(null);
    useEffect(() => {
        const fetchPreview = async () => {
            const result = await service.getFilePreview(image);
            setPreviewImage(result);
        };

        fetchPreview();
    }, [image]);
  

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img className='rounded-xl' src={previewImage && previewImage} alt={title} />

                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard