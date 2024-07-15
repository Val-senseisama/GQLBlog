import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const CategoryButton = ({ category }) => {
  const categoryColorMap = {
    technology: "technology",
    health: "health",
    science: "science",
    sports: "sports",
    politics: "politics",
    entertainment: "entertainment",
    education: "education",
    fashion: "fashion",
    food: "food",
    finance:"finance"
  };


  const categoryClass = categoryColorMap[category.toLowerCase()];
  return (
    <Button className={`category-button ${categoryClass}`}>
      <Link to={`/category-blogs/${category}`}>
      {category}
      </Link>
    </Button>
  );
};

export default CategoryButton;
