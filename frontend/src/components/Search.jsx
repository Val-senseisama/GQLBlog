import React, { useState } from 'react'; // Add useDebounce import
import SearchResultList from './SearchResultList';



const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');

  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    React.useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
  
    return debouncedValue;
  }

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search by blog name"
      />
      <div className="position-absolute z">
      <SearchResultList debouncedSearchTerm={debouncedSearchTerm} />
      </div>
    </div>
  );
};



export default SearchComponent;
