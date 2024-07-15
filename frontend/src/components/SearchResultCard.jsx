import React from 'react'
import { Link } from 'react-router-dom';

const SearchResultCard = ({blog}) => {
    const {title, author, _id} = blog;
    console.log(blog);
  return (
    <Link to={`/blog/${_id}`}>
    <div className='search-result result-card'>
    <h5>{title}</h5>
    <p>By {author.name} </p>
        </div>
    </Link>
    
  )
}

export default SearchResultCard
