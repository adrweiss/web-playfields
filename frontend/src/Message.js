import React from 'react';
import "./Message.css";
import Button from '@material-ui/core/Button';

function Message({id, title, post, usr, timestamp}) {
  return (
    <div className='container'>
      <div className='post__container'>
        
        <h3 className='post__title'>{title}</h3>
      
        {post}
        <div className='user__date_container'>
          <div>
            User: {usr} 
          </div>
          <div>
            Date: {timestamp}
          </div>
        </div>
        <div className='delete_button' >
          <Button size="small" variant="contained" color="secondary">
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}


export default Message