import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { GET_BLOG } from '../graphql/queries/blogQuery'
import { useParams } from 'react-router-dom'
import { Button, Col, Container, Row } from 'react-bootstrap'
import UserAvatar from '../components/Avatar'
import CategoryBar from '../components/CategoryBar'
import InfoBar from '../components/InfoBar'
import MiniBlogCard from '../components/MiniBlogCard'
import { CREATE_COMMENT } from '../graphql/mutations/commentMutation'
import toast from 'react-hot-toast'
import SingleBlogSkeleton from '../components/skeletons/Blog skeleton/SingleBlogSkeleton'
import { GET_AUTHENTICATED_USER } from '../graphql/queries/userQuery'

const SingleBlog = () => {
	const {id} = useParams();
    const {data, loading, error} = useQuery(GET_BLOG, {
        variables:{id: id},
        refetchQueries: ["GetBlog"]
    });

    const [createComment, {loading: commentsLoading}] = useMutation(CREATE_COMMENT);
    const { data: authUserData } = useQuery(GET_AUTHENTICATED_USER);
    const userId = authUserData.authUser._id;
    const userLikes = authUserData.authUser;
    console.log(userLikes);
    const [commentData, setCommentData ] = useState("");

    if (loading) return <SingleBlogSkeleton />;
    if (error) return <p>Error: {error.message}</p>;
    if (!data || !data.blog) return <p>No blogs available.</p>;
    
    const { title, content, author, images, category, likes, comments, _id } = data.blog;

   // const {{data:comments}, {loading: commentsLoading}} = useQuery(GET_COMMENTS)
   console.log(likes);

    const commentCount = comments.length;
    const likeCount = likes.length;

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try { 
             await createComment({
                variables: {
                    input: {
                        blogId: id,
                        content: commentData,
                    },
                },
                update: (cache, { data: { createComment } }) => {
                    const { blog } = cache.readQuery({
                        query: GET_BLOG,
                        variables: { id }
                    });
    
                    cache.writeQuery({
                        query: GET_BLOG,
                        variables: { id },
                        data: {
                            blog: {
                                ...blog,
                                comments: [...blog.comments, createComment],
                            },
                        },
                    });
                },
            });
            toast.success("Comment sent")
            setCommentData(""); 
        } catch (error) {
            toast.error(error.message)
        }
    };

    const handleCommentChange = (e) => {
        setCommentData(e.target.value);
    };
    


  return (
    <Container>
        <Row>
        <Col lg={8} md={8} sm={12}>
        <h1 className='text-center my-3 mt-3'>{title}</h1>
        <hr />
        <div className="author-deets px-5 mx-2 d-flex align-items-center">
    <UserAvatar src={author.profilePic} size={50} />
    <p className="p-3"> {author.name}</p>
        </div>
        <div className='px-5 mx-2'>     
        <CategoryBar category={category} />
        <InfoBar commentCount={commentCount} userId={userId} userLikes={likes} blogId={_id} initialLikeCount={likeCount} />
        </div>
        <hr />
        <div className="d-flex flex-column justify-content-center">
        
        {/* <img className='my-2 mx-auto img-fluid' src={images[0]} alt="Blog-img"  /> */}
        <div className='mx-auto px-5 mx-2 my-3 img-fluid blog-content'  dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>

        </Col>

        <Col lg={4} md={4} sm={12} className='sidebar'>
        <h3 className="text-center my-3">
            Comments
        </h3>
        <div className="d-flex flex-column align-items-center">
        <form className='d-flex flex-column align-items-center' onSubmit={handleSubmit}>
            <textarea 
                name="comment" 
                className='d-block'
                id="com" rows="4" cols="36" 
                placeholder='Add a comment' 
                value={commentData} 
                onChange={handleCommentChange} />

            <Button
									type='submit'
									className=' submit-button text-white font-bold mt-3 py-2 px-5 rounded focus:outline-none focus:shadow-outline mx-auto'
									disabled={loading}
									size="lg"
								>
									{ commentsLoading? "Loading..." :"Submit"}
								</Button>
        </form>
        {comments.map((c, index) => {
            return <MiniBlogCard key={c._id} blog={c} />
        })}
        </div>
 
        </Col>

        </Row>
       
      
    </Container>
  )
}

export default SingleBlog
