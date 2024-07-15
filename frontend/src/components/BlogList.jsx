import React from 'react';
import { GET_BLOGS } from "../graphql/queries/blogQuery";
import { useQuery } from "@apollo/client";
import BlogCard from "../components/BlogCard";
import BlogCardSkeleton from './skeletons/Blog skeleton/BlogCardSkeleton';

const BlogList = () => {
    const { data, loading, error } = useQuery(GET_BLOGS, {
        refetchQueries: [{ query: GET_BLOGS }]
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
    if (!data || !data.blogs) return <p>No blogs available.</p>;
    
    return (
        data.blogs.map((blog) => {      
            return <BlogCard key={blog._id}  blog={blog} />
            
        })
    )
       
}

export default BlogList
