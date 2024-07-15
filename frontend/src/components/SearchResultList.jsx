import React from 'react'
import { SEARCH_BLOGS } from '../graphql/queries/blogQuery';
import { useQuery } from '@apollo/client';
import SearchResultCard from './SearchResultCard';
import SkeletonSearchResultCard from './skeletons/search skeletons/SkeletonSearchResultCard';
import toast from 'react-hot-toast';

const SearchResultList = ({debouncedSearchTerm}) => {
    const { data, loading, error } = useQuery(SEARCH_BLOGS, {
        variables: { name: debouncedSearchTerm },
        skip: debouncedSearchTerm.length < 3, // Skip query if search term is too short
      });


  return (
  data && <div className='search-result'>
    {loading && <SkeletonSearchResultCard />}
    {error && toast.error('Error fetching search results')}
        {data &&
          data.searchBlogs.map((blog) => (
            <SearchResultCard key={blog._id} blog={blog} />
          ))}
      
    </div>

  )
}

export default SearchResultList
