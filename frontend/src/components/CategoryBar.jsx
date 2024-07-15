import React from 'react';
import CategoryButton from './CategoryButton';

const CategoryBar = ({ category }) => {
  return (
    <div className='d-flex flex-row align-items-center mb-2'>
      {category.map((c, index) => (
        <CategoryButton key={index} category={c} />
      ))}
    </div>
  );
};

export default CategoryBar;
