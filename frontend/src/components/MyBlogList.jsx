import React from 'react';
import {  GET_MY_BLOGS } from "../graphql/queries/blogQuery";
import { useQuery } from "@apollo/client";
import BlogCardSkeleton from './skeletons/Blog skeleton/BlogCardSkeleton';
import MyBlogCard from './MyBlogCard';

const MyBlogList = () => {
    const { data, loading, error } = useQuery(GET_MY_BLOGS, {
        refetchQueries: [{ query: GET_MY_BLOGS }]
    });


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
    if (!data || !data.myBlogs) return <p>No blogs available.</p>;
    
    return (
        data.myBlogs.map((blog) => {      
            return <MyBlogCard key={blog._id}  blog={blog} />
            
        })
    )
       
}

export default MyBlogList
