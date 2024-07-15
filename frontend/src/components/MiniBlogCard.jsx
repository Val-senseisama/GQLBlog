import React from 'react';
import UserAvatar from './Avatar';
import MiniBlogCardSkeleton from './skeletons/MiniblogCard skeleton/MiniblogCardSkeleton';

const MiniBlogCard = ({blog, loading}) => {
    const { author, title, content} = blog;
    

    if (loading) {
      return <MiniBlogCardSkeleton />;
  }
  
  return (
    <div className='mini-card my-3'>
        <div className="mini-card-header d-flex align-items-center">
        <UserAvatar size={25} src={author.profilePic}/>
      <p className='px-2 pt-2'>{author.name}</p>
        </div>
        <div className="mini-content pt-2 pr-4">
            <p> {title ? title : content}</p>
        </div>
      
    </div>
  )
}

export default MiniBlogCard;
