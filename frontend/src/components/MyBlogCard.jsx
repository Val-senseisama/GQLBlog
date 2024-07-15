import React, { useEffect, useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import UserAvatar from './Avatar';
import InfoBar from './InfoBar';
import CategoryBar from './CategoryBar';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { DELETE_BLOG } from '../graphql/mutations/blogMutation';
import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';

const MyBlogCard = ({ blog }) => {
    const { title, content, author, images, category, comments, likes } = blog;
    const firstImage = images && images.length > 0 ? images[0] : null;
    const [deleteBlog, {loading: deleteloading}] = useMutation(DELETE_BLOG, {
		refetchQueries:["GetBlogs", "GetMyBlogs"]
	});

    const truncateContent = (text, length) => {
        if (text.length <= length) return text;
        return text.substring(0, length) + '...';
    };
    const navigate = useNavigate();
    const [avatarSize, setAvatarSize] = useState(50);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setAvatarSize(25);
            } else {
                setAvatarSize(50);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const commentCount = blog.comments.length;
    const likeCount = blog.likes.length;

    const handleDelete = async() => {
        try {
            await deleteBlog({variables: {blogId: blog._id}});
            toast.success("Blog deleted sucessfully");
            } catch (error) {
                console.error("Error deleting blog:", error);
                toast.error(error.message);
            }
    };

    const handleEdit = () => {
        navigate(`/edit-blog/${blog._id}`);
        console.log('Edit blog', blog._id);
    };

    return (
        <Card className="mb-4 blog">
            <Card.Header className="d-flex justify-content-end bg-white border-0">
                <Button variant="link"  className="p-0 mx-2" onClick={handleEdit} >
                    <Link to={`/edit-blog/${blog._id}`}>
                    <FaEdit size={20} color='black' />
                    </Link> 
                </Button>
                <Button variant="link" className="p-0 mx-2" onClick={handleDelete}>
                   { deleteloading ? 
                                 <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                 </Spinner> : 
                              <FaTrash size={20} color='black' />}
                </Button>
            </Card.Header>
            {firstImage && <Card.Img variant="top" src={firstImage} alt={firstImage.caption || title} className="blog-card-image" />}
            <Card.Body>
                <div className="d-flex align-items-center mb-3 card-credentials">
                    <UserAvatar src={author.profilePic} size={avatarSize} round={true} />
                    <div className="ms-2">
                        <Card.Title className="card-title py-2">{title}</Card.Title>
                        <Card.Subtitle className="text-muted card-subtitle">By {author.name}</Card.Subtitle>
                    </div>
                </div>
                <CategoryBar category={category} />
                <Card.Text className="card-text">
                    {truncateContent(content, 100)} <Link to={`/blog/${blog._id}`} className="read-more links">Read more</Link>
                </Card.Text>
            </Card.Body>
            <Card.Footer className="bg-white border-0">
                <InfoBar commentCount={commentCount} likeCount={likeCount} userLikes={likes} blogId={blog._id} />
            </Card.Footer>
        </Card>
    );
};

export default MyBlogCard;
