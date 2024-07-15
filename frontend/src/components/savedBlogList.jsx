import React from 'react';
import {   GET_SAVED_BLOGS } from "../graphql/queries/blogQuery";
import { useQuery } from "@apollo/client";
import BlogCardSkeleton from './skeletons/Blog skeleton/BlogCardSkeleton';
import BlogCard from './BlogCard';

const SavedBlogList = () => {
    const { data, loading, error } = useQuery(GET_SAVED_BLOGS, {
        refetchQueries: [{ query: GET_SAVED_BLOGS }]
    });
    console.log(data);


if (loading) {
    return (
        <>
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
        </>
    );
}
    if (error) return <p>Error: {error.message}</p>;
    if (!data || !data.savedBlogs) return <p>No blogs available.</p>;
    
    return (
        data.savedBlogs.map((blog) => {      
            return <BlogCard key={blog._id}  blog={blog} />
            
        })
    )
       
}

export default SavedBlogList
