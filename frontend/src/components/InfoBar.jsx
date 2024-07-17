import React, { useState, useEffect } from 'react';
import { FaHeart, FaBookmark, FaRegComment } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { LIKE_BLOG } from '../graphql/mutations/blogMutation';
import { SAVE_BLOG, UNSAVE_BLOG } from '../graphql/mutations/userMutation';
import toast from 'react-hot-toast';
import { GET_USER_SAVED_BLOGS } from '../graphql/queries/userQuery';

const InfoBar = ({ blogId, userId, commentCount, initialLikeCount, userLikes }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [saved, setSaved] = useState(false);
  const [likeBlog] = useMutation(LIKE_BLOG);
  const [saveBlog] = useMutation(SAVE_BLOG);
  const [unsaveBlog] = useMutation(UNSAVE_BLOG);

  // Fetch saved blogs for the user
  const { data: userData } = useQuery(GET_USER_SAVED_BLOGS, {
    variables: { userId },
    onCompleted: (data) => {
      if (data && data.user) {
        const isSaved = data.user.savedBlogs.some(blog => blog._id === blogId);
        setSaved(isSaved);
      }
    },
    onError: (error) => {
      console.error('Error fetching saved blogs:', error.message);
    },
  });

  useEffect(() => {
    // Check if the current blog is liked by the user
    setLiked(userLikes.includes(userId));
    console.log(liked);
  }, [userLikes, userId]);

  const handleLikeClick = async () => {
    try {
      const { data } = await likeBlog({ variables: { blogId } });
      if (data && data.likeBlog) {
        console.log('Data:', data); // Log the data
        const updatedLikes = data.likeBlog.likes 
        console.log('Updated likes:', updatedLikes); // Log the updated likes array
       // Update like count and state
        setLikeCount(updatedLikes.length);
        setLiked(prevLiked => !prevLiked);
      }
    } catch (error) {
      console.error('Error liking blog:', error.message);
      toast.error('Error liking blog');
    }
  };

  const handleSaveClick = async () => {
    try {
      if (saved) {
        // If already saved, unsave the blog
        await unsaveBlog({ variables: { blogId } });
        setSaved(false); // Toggle the saved state
        toast.success('Blog unsaved');
      } else {
        // If not saved, save the blog
        await saveBlog({ variables: { blogId } });
        setSaved(true); // Toggle the saved state
        toast.success('Blog saved');
      }
    } catch (error) {
      console.error('Error saving/unsaving blog:', error.message);
      toast.error('Error saving/unsaving blog');
    }
  };

  return (
    <div className='d-flex flex-row align-items-center'>
      <div className="likes px-3" onClick={handleLikeClick} style={{ cursor: 'pointer' }}>
        <FaHeart style={{ color: liked ? 'red' : 'gray' }} />
        <span className='px-2'>{likeCount}</span>
      </div>
      <div className="comments px-3">
        <FaRegComment />
        <span className='px-2'>{commentCount}</span>
      </div>
      <div className="save px-3" onClick={handleSaveClick} style={{ cursor: 'pointer' }}>
        <FaBookmark style={{ color: saved ? 'blue' : 'gray' }} />
        <span className='px-2'>{saved ? 'Saved' : 'Save'}</span>
      </div>
    </div>
  );
};

export default InfoBar;
