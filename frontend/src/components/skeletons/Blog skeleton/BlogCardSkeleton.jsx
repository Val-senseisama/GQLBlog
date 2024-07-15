import React from 'react';
import { Card } from 'react-bootstrap';
import './BlogCardSkeleton.css'; // Create this CSS file for skeleton styles

const BlogCardSkeleton = () => {
    return (
        <Card className="mb-4 blog skeleton-card">
            <div className="skeleton-image skeleton"></div>
            <Card.Body>
                <div className="d-flex align-items-center mb-3 card-credentials">
                    <div className="skeleton-avatar skeleton"></div>
                    <div className="ms-2">
                        <div className="skeleton-title skeleton"></div>
                        <div className="skeleton-subtitle skeleton"></div>
                    </div>
                </div>
                <div className="skeleton-category-bar skeleton"></div>
                <div className="skeleton-text skeleton"></div>
            </Card.Body>
            <Card.Footer className="bg-white border-0">
                <div className="skeleton-info-bar skeleton"></div>
            </Card.Footer>
        </Card>
    );
};

export default BlogCardSkeleton;
