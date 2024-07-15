import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import UserAvatar from './Avatar';
import InfoBar from './InfoBar';
import CategoryBar from './CategoryBar';
import { Link } from 'react-router-dom';
import htmlTruncate from 'html-truncate';
import { useQuery } from '@apollo/client';
import { GET_AUTHENTICATED_USER } from '../graphql/queries/userQuery';

const BlogCard = ({ blog }) => {
    const { title, content, author, images, category, comments, likes } = blog;
    const firstImage = images && images.length > 0 ? images[0] : null;
    const {data} = useQuery(GET_AUTHENTICATED_USER, {refetchQueries: ["GetAuthenticatedUser"]});

    // Adjust the truncate length as needed
    const truncateContent = (html, length) => {
        return htmlTruncate(html, length, { ellipsis: '...' });
    };

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

    return (
        <Card className="mb-4 blog">
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
                    <div dangerouslySetInnerHTML={{ __html: truncateContent(content, 100) }} />
                    <Link to={`/blog/${blog._id}`} className="read-more links">Read more</Link>
                </Card.Text>
            </Card.Body>
            <Card.Footer className="bg-white border-0">
                <InfoBar commentCount={commentCount} likeCount={likeCount} userId={data.authUser._id} userLikes={likes} blogId={blog._id} />
            </Card.Footer>
        </Card>
    );
};

export default BlogCard;
