import React from 'react';
import './SkeletonLoader.css'; // Create this CSS file for skeleton styles

const SingleBlogSkeleton = () => {
    return (
        <div className='skeleton-container'>
            <div className='skeleton-header text-center my-3 mt-3 skeleton'></div>
            <hr />
            <div className='author-deets px-5 mx-2 d-flex align-items-center'>
                <div className='skeleton-avatar skeleton'></div>
                <div className='skeleton-author-name skeleton p-3'></div>
            </div>
            <div className='px-5 mx-2'>
                <div className='skeleton-category-bar skeleton'></div>
                <div className='skeleton-info-bar skeleton'></div>
            </div>
            <hr />
            <div className='d-flex flex-column justify-content-center'>
                <div className='skeleton-content mx-auto px-5 mx-2 my-3 skeleton'></div>
            </div>
            <h3 className='text-center my-3 skeleton'></h3>
            <div className='d-flex flex-column align-items-center'>
                <div className='skeleton-comment-form skeleton'></div>
                <div className='skeleton-mini-cards'>
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className='skeleton-mini-card skeleton my-3'></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SingleBlogSkeleton;
