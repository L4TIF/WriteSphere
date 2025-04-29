import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import service from '../appwrite/appwriteConfig'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetPostByIDQuery } from '../store/postApi';

const EditPost = () => {
    const { state: postId } = useLocation();
    const { data: post, isLoading, error } = useGetPostByIDQuery(postId)
    const navigate = useNavigate()
    if (error) navigate('/')
    if (isLoading) return <Container>Loading...</Container>

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>

        </div>
    ) : null
}

export default EditPost