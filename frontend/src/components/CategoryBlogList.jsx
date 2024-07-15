import React from 'react';
import { GET_CATEGORY_BLOGS } from "../graphql/queries/blogQuery";
import { useQuery } from "@apollo/client";
import BlogCard from "../components/BlogCard";
import BlogCardSkeleton from './skeletons/Blog skeleton/BlogCardSkeleton';
import { useParams } from 'react-router-dom';

const CategoryBlogList = () => {
    const { category } = useParams();
    const { data, loading, error } = useQuery(GET_CATEGORY_BLOGS, {
        variables: { category },
        refetchQueries: [{ query: GET_CATEGORY_BLOGS }]
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
    if (!data || !data.categoryBlogs) return <p>No blogs available.</p>;
    
    return (
        data.categoryBlogs.map((blog) => {      
            return <BlogCard key={blog._id}  blog={blog} />
            
        })
    )
       
}

export default CategoryBlogList;
