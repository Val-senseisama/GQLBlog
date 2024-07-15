import React from "react";
import Avatar from 'react-avatar';

const UserAvatar = ({src, size})=>{
    return(
<Avatar src={src} size={size} round={true} />
    );
}

export default UserAvatar;