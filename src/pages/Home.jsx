import React from 'react'
import { Container, PostCard } from '../components'
import { useGetPostsQuery } from '../store/postApi';
import Loader from '../components/Loader';

// refetch after updating / deleting and create api for getPost

const Home = () => {
    const { data: posts, error, isLoading } = useGetPostsQuery();

    if (error) return <Container>Error fetching post</Container>

    if (isLoading) return (
        <div className='w-full py-8'>
            <Container>
                <div className="min-h-[60vh]">
                    <Loader size="lg" text="Loading posts..." />
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

export default Home