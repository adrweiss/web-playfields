import React, { useState } from 'react';
import "./Message.css";

import { getCurrentUser } from "../services/auth.service"
import HomeService from "../services/home.service.js"

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

function Message({ id, title, post, userId, usr, timestamp }) {
  const [message, setMessage] = useState("");
  const [timerId, setTimerId] = useState();
  const [deleted, setDeleted] = useState(false)
  const [edited, setEdited] = useState(false)
  const [editedPost, setEditedPost] = useState(post)
  const [dispPost, setDispPost] = useState(post)

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

  const editSend = () => {
    setEdited(!edited)
    setDispPost(editedPost)
  }

  const editPost = () => {
    setEdited(!edited)
  }

  const handleChangePost = (event) => {
    setEditedPost(event.target.value);
  };

  return (
    <div className='post__container'>

      {message && (
        <div className="response">
          {message}
        </div>
      )}

      <div hidden={deleted}>
        <Tooltip title={usr ? usr : "Guest"}>
          <div className="circle_v1">
            {usr ? usr.substring(0, 2).toUpperCase() : "GU"}
          </div>
        </Tooltip>

        <div className="circle_v2"></div>

        <h3 className='post__title'>{title}</h3>

        <div className='box__post__container' hidden={edited}>
          {dispPost}
        </div>

        <div className='box__edit__container' hidden={!edited}>
          <TextField
            className='input__post'
            label="Post"
            multiline
            variant="outlined"
            margin="normal"
            value={editedPost}
            onChange={handleChangePost}
          />
        </div>

        <div className='box__edit__container' hidden={!edited}>
          <Button
            className='edit__button'
            variant="contained"
            color="primary"
            onClick={editSend}
          >
            Edit
          </Button>
        </div>

        <div className='user__date__container'>
          <div className="box__creation__date">
            Creation date: {timestamp}
          </div>

          <div className="box__delete__post">
            <IconButton onClick={editPost}>
              <Tooltip title="Edit post" aria-label="delete_user">
                <EditIcon />
              </Tooltip>
            </IconButton>
          </div>

          <div className="box__delete__post">
            <IconButton onClick={deletePost} disabled={!(currentUser && (currentUser?.id === userId || currentUser?.rights.includes('DELETE_ANY_POST') || currentUser?.rights.includes('ADMIN')))}>
              <Tooltip title="Delete post" aria-label="delete_user">
                <DeleteIcon />
              </Tooltip>
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Message

