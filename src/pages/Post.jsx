import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { useDeletePostMutation, useGetPostByIDQuery, useGetPostImageQuery, useGetPostsQuery } from "../store/postApi";
import { Query } from "appwrite";



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

    if (error) navigate('/')
    if (isLoading) return <Container>Post Loading...</Container>
    return (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {previewImageStatus?.isLoading && <p>Image Loading...</p>}
                    <img
                        src={previewImage}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.slug}`} state={post.$id}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={handledeletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    )
}