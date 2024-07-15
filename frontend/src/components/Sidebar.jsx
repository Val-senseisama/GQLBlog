import React from 'react'
import CategoryButton from './CategoryButton'
import TopPicks from './TopPicks'

const Sidebar = () => {
    const category = ["technology", "health", "science", "sports", "politics", "entertainment", "education", "fashion", "food", "finance"]
  return (
    <div className='sidebar'>
<div className="trending">
  <TopPicks />
  <hr />
</div>
      <div className="category-badges">
      { category.map((c, index) => 
        <div className='d-inline-block my-2'>  <CategoryButton key={index} category={c}/> </div>
        
       )
      }
      </div>
     
    </div>
  )
}

export default Sidebar
