import React, { useState } from 'react';
import "./Message.css";

import { getCurrentUser } from "../services/auth.service"
import HomeService from "../services/home.service.js"

import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

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
    <div className='post__container'>

      {message && (
        <div className="response">
          {message}
        </div>
      )}


      <div hidden={deleted}>

        {/*<div class="circle">{usr ? usr : "Guest"}</div>
        */}

        <Tooltip title={usr ? usr : "Guest"}>
          <div className="circle_v1">
            {usr ? usr.substring(0, 2).toUpperCase() : "GU"}
          </div>
        </Tooltip>

        <div className="circle_v2"></div>

        <h3 className='post__title'>{title}</h3>

        <div className='box__post__container'>
          {post}
        </div>

        <div className='user__date__container'>
          <div className="box__creation__date">
            Creation date: {timestamp}
          </div>

          <div className="box__delete__post">
            <IconButton onClick={deletePost} disabled={!(currentUser && (currentUser?.id === userId || currentUser?.rights.includes('DELETE_ANY_POST') || currentUser?.rights.includes('ADMIN')))}>
              <Tooltip title="Delete post." aria-label="delete_user">
                <DeleteIcon fontSize='medium' />
              </Tooltip>
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Message

