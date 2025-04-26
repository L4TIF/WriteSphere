import React, { useEffect, useState } from 'react'
import service from '../appwrite/appwriteConfig'
import { Container, PostCard } from '../components'


const AllPost = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        service.listAllPost([]).then((res) => {
            setPosts(res.documents)
        })
    }, [])
    if (posts.length === 0) {
        return <div>no posts found create one</div>
    }
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

export default AllPost