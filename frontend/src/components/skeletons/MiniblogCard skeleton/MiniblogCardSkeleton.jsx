import React from 'react';
import './SkeletonLoader.css'; // Create this CSS file for skeleton styles

const MiniBlogCardSkeleton = () => {
    return (
        <div className='mini-card-skeleton my-3'>
            <div className="mini-card-header d-flex align-items-center">
                <div className="skeleton-avatar"></div>
                <div className="skeleton-text skeleton-author-name"></div>
            </div>
            <div className="mini-content pt-2 pr-4">
                <div className="skeleton-text skeleton-title"></div>
                <div className="skeleton-text skeleton-content"></div>
            </div>
        </div>
    );
}

export default MiniBlogCardSkeleton;
