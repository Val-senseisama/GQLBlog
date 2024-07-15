import React from 'react';
import './SkeletonSearchResultCard.css'; // Ensure you import the CSS for the skeleton

const SkeletonSearchResultCard = () => {
  return (
    <div className='search-result'>
      <div className='skeleton skeleton-title'></div>
      <div className='skeleton skeleton-author'></div>
    </div>
  );
};

export default SkeletonSearchResultCard;
