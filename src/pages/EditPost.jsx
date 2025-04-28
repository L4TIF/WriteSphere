import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import service from '../appwrite/appwriteConfig'
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
    const [post, setPost] = useState(null);
    const { state: postId } = useLocation();

    const navigate = useNavigate()
    useEffect(() => {
        if (postId) {
            service.getPost(postId).then((post) => {
                if (post) setPost(post)
            })
        }
        else
            navigate(`/`)
    }, [navigate])
    
    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>

        </div>
    ) : null
}

export default EditPost