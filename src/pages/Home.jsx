import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import { useGetPostsQuery } from '../store/postApi';

// refetch after updating / deleting and create api for getPost

const Home = () => {

    const { data: posts, error, isLoading } = useGetPostsQuery();

    if (error) return <Container>Error fetching post</Container>

    if (isLoading)
        return <Container>Loading...</Container>

    if (posts.length === 0)
        return <Container>No posts, create new posts.</Container>

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