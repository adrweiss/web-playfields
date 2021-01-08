import React from 'react';
import "./Message.css";
import Button from '@material-ui/core/Button';
import { getCurrentUser } from "../services/auth.service"

function Message({ id, title, post, userId, usr, timestamp }) {
  const currentUser = getCurrentUser();

  const deletePost = () => {
    console.log(id)
  }

  return (
    <div className='container'>
      <div className='post__container'>

        <h3 className='post__title'>{title}</h3>

        {post}
        <div className='user__date_container'>
          <div>
            User: {usr ? usr : "Guest"}
          </div>

          <div>
            Date: {timestamp}
          </div>
        </div>
        {(currentUser?.id === userId || currentUser?.rights.includes('DELETE_ANY_POST')) &&  (
          <div className='delete_button' >
            <Button size="small" variant="contained" color="secondary" onClick={deletePost}>
              Delete
          </Button>
          </div>
        )}
      </div>
    </div>
  )
}


export default Message
