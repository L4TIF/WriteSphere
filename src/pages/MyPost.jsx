import React from 'react'
import { Container, PostCard } from '../components'
import { useGetPostsQuery } from '../store/postApi';
import { Query } from 'appwrite';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';

const MyPost = () => {
    const currentUserID = useSelector((state) => state.auth.userData.$id);

    const { data: posts, error, isLoading } = useGetPostsQuery([
        Query.equal("userId", [currentUserID]),
        Query.orderDesc('$updatedAt'),
        Query.orderDesc('$createdAt')
    ]);

    if (error) return <Container>Error fetching post</Container>
    
    if (isLoading) return (
        <div className='w-full py-8'>
            <Container>
                <div className="min-h-[60vh]">
                    <Loader size="lg" text="Loading your posts..." />
                </div>
            </Container>
        </div>
    )

    if (posts.length === 0)
        return <Container>No posts, create new posts.</Container>

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 '>
                    {
                        posts.map((post) => (
                            <div key={post.$id} className='m-2 max-h-72 shadow-sm'>
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