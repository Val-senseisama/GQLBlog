import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_BLOGS } from '../graphql/queries/blogQuery';
import MiniBlogCard from './MiniBlogCard';
import toast from 'react-hot-toast';
import MiniBlogCardSkeleton from './skeletons/MiniblogCard skeleton/MiniblogCardSkeleton';

const TopPicks = () => {
    const { data, loading, error } = useQuery(GET_BLOGS, {
        refetchQueries: [{ query: GET_BLOGS }]
    });


    if (error) return toast.error(error.message);
    if (!data || !data.blogs) return <p>No blogs available.</p>;

    // Create a copy of the array to avoid modifying the original
    const sortedBlogs = [...data.blogs].sort((a, b) => {
        return b.likes.length - a.likes.length;  // descending order
    });
const topBlogs = sortedBlogs.slice(0,2)

    return (
        <div >
            <h3 className='text-center py-3'>Top Picks</h3>
            <hr />
            
            {loading ? (
                <>
                    <MiniBlogCardSkeleton />
                    <MiniBlogCardSkeleton />
                </>
            ) : (
                topBlogs.map(blog => (
                    <MiniBlogCard 
                        key={blog._id}
                        blog={blog}
                    />
                ))
            )}
        </div>
    );
};

export default TopPicks;
