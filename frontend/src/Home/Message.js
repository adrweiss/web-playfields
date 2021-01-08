import React, { useState } from 'react';
import "./Message.css";
import Button from '@material-ui/core/Button';

import { getCurrentUser } from "../services/auth.service"
import HomeService from "../services/home.service.js"


function Message({ id, title, post, userId, usr, timestamp }) {
  const [message, setMessage] = useState("");
  const [timerId, setTimerId] = useState();
  const [deleted, setDeleted] = useState(false)

  const currentUser = getCurrentUser();

  function removeMessage() {
    setMessage("")
  }

  const deletePost = () => {
    removeMessage()
    clearTimeout(timerId)

    if (currentUser?.rights.includes('DELETE_ANY_POST') || currentUser?.rights.includes('ADMIN')) {
      HomeService.deletePostAny(id).then((response) => {
        setMessage(response.data.message)
        setTimerId(setTimeout(removeMessage, 10000));
        setDeleted(true)
      },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(_content);
          setTimerId(setTimeout(removeMessage, 10000));
        })
    } else {
      HomeService.deletePostUser(id).then((response) => {
        setMessage(response.data.message)
        setTimerId(setTimeout(removeMessage, 10000));
        setDeleted(true)
      },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(_content);
          setTimerId(setTimeout(removeMessage, 10000));
        })
    }
  }

  return (
    <div className='container'>
      <div className='post__container'>

        {message && (
          <div className="response">
            {message}
          </div>
        )}
        <div hidden={deleted}>
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
          {currentUser && (currentUser?.id === userId || currentUser?.rights.includes('DELETE_ANY_POST') || currentUser?.rights.includes('ADMIN')) && (
            <div className='delete_button'>
              <Button size="small" variant="contained" color="secondary" onClick={deletePost}>
                Delete
          </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


export default Message
