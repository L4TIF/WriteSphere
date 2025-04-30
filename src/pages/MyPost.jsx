import React, { useEffect, useState } from 'react'
import service from '../appwrite/appwriteConfig'
import { Container, PostCard } from '../components'
import { useGetPostsQuery } from '../store/postApi';
import { Query } from 'appwrite';
import { useSelector } from 'react-redux';


const MyPost = () => {
    const currentUserID = useSelector((state) => state.auth.userData.$id);

    const { data: posts, error, isLoading } = useGetPostsQuery([
        Query.equal("userId", [currentUserID]),
        Query.orderDesc('$updatedAt'),
        Query.orderDesc('$createdAt')
    ]);

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
                            <div key={post.$id} className='p-2 md:w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))
                    }
                </div>
            </Container>


        </div>
    )
}

export default MyPost