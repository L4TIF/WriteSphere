import React, { useEffect, useState } from 'react'
import service from '../appwrite/appwriteConfig'
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux';
import { useGetPostsQuery } from '../store/postApi';

// todo fix this 

const Home = () => {

    const { data: posts, error, isLoading } = useGetPostsQuery();
    const isLoggedIn = useSelector(state => state.auth.status)

    if (error) return <Container>Error fetching post</Container>

    if (isLoading)
        return <Container>Loading...</Container>

    if (posts.length === 0)
        return <Container>No posts, create new posts.</Container>

    if (!isLoggedIn)
        return <Container>Login to read posts.</Container>
    
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {
                        posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))
                    }
                </div>
            </Container>

        </div>
    )
}

export default Home