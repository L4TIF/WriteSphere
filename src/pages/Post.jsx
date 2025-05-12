import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { useDeletePostMutation, useGetPostByIDQuery, useGetPostImageQuery, useGetPostsQuery } from "../store/postApi";
import { Query } from "appwrite";
import Loader from "../components/Loader";

export default function Post() {
    const { state } = useLocation();
    const { slug } = useParams();
    let { data: post, error, isLoading } = state ?
        useGetPostByIDQuery(state?.postId)
        :
        useGetPostsQuery([  // fetch using param slug
            Query.equal('slug', [slug])
        ])
    if (Array.isArray(post)) [post] = post; //destruct post obj if is array

    const [deletePost, deletePostStatus] = useDeletePostMutation();

    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    const { data: previewImage, ...previewImageStatus } = useGetPostImageQuery(post?.image)

    const handledeletePost = async () => {
        const { data: response } = await deletePost(post);
        if (response) navigate('/')
    }
    if (post) {
        console.log(post)
    }
    if (error) navigate('/')
    if (isLoading) return (
        <div className="py-8">
            <Container>
                <div className="min-h-[60vh]">
                    <Loader size="lg" text="Loading your post..." />
                </div>
            </Container>
        </div>
    )
    return (
        <div className="py-8">
            <Container>
                <div className="w-full max-h-96 flex justify-center mb-4 relative border rounded-xl p-2">
                    {previewImageStatus?.isLoading && (
                        <div className="absolute inset-0 bg-theme/50 backdrop-blur-sm rounded-xl">
                            <Loader size="md" text="Loading image..." />
                        </div>
                    )}
                    <img
                        src={previewImage}
                        alt={post.title}
                        className="rounded-xl w-full object-contain"
                    />

                    {isAuthor && (
                        <div className="absolute right-4 top-4 flex gap-2">
                            <Link to={`/edit-post/${post.slug}`} state={post.$id}>
                                <button
                                    className="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors duration-200"
                                    title="Edit Post"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                </button>
                            </Link>
                            <button
                                onClick={handledeletePost}
                                className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors duration-200"
                                title="Delete Post"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                        <span className="text-theme/70">Author: {post.authorName ? post.authorName : 'Unknown'}</span>
                    </div>
                </div>
                <div className="prose dark:prose-invert max-w-none [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:mb-4 [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:mb-3 [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mb-2 [&>p]:text-base [&>p]:mb-4 [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-4 [&>li]:mb-2 [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:mb-4 [&>pre]:bg-gray-100 [&>pre]:dark:bg-gray-800 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:mb-4 [&>code]:bg-gray-100 [&>code]:dark:bg-gray-800 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm [&>table]:w-full [&>table]:mb-4 [&>table]:border-collapse [&>th]:border [&>th]:border-gray-300 [&>th]:dark:border-gray-600 [&>th]:p-2 [&>td]:border [&>td]:border-gray-300 [&>td]:dark:border-gray-600 [&>td]:p-2">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    )
}