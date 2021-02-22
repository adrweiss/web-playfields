import React, { useState } from 'react'
import './Home.Reported.Management.css'

import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FlagIcon from '@material-ui/icons/Flag';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

import ManagementService from "../services/mgt.service"
import HomeService from "../services/home.service.js"

function HomeReportedManagement({ id, username, body, title, solved, blocked, changed, date, statusSolved, statusBlocked }) {
  const [solvedStatus, setSolvedStatus] = useState(solved);
  const [blockedStatus, setBlockedStatus] = useState(blocked);
  const [message, setMessage] = useState("");
  const [timerId, setTimerId] = useState();
  const [deleted, setDeleted] = useState(false)
  const [edited, setEdited] = useState(false)
  const [editedPost, setEditedPost] = useState(body)
  const [dispPost, setDispPost] = useState(body)
  const [dispTitle, setDispTitle] = useState(title)
  const [editedTitle, setEditedTitle] = useState(title)

  function removeMessage() {
    setMessage("")
  }

  const handleSolvedStatus = () => {
    setSolvedStatus(!solvedStatus)
    ManagementService.putReportStatus(id, !solvedStatus).then((response) => {
      console.log(response.data.message);
    },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(_content);
      })
  }

  const handleBlockedStatus = () => {
    setBlockedStatus(!blockedStatus)
    ManagementService.putReportStatusBlocked(id, !blockedStatus).then((response) => {
      console.log(response.data.message);
    },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(_content);
      })
  }

  const deletePost = () => {
    removeMessage()
    clearTimeout(timerId)

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
  }

  const editSend = () => {
    setEdited(!edited)
    removeMessage()
    clearTimeout(timerId)

    HomeService.editPostAny(id, editedTitle, editedPost).then((response) => {
      setMessage(response.data.message)
      setTimerId(setTimeout(removeMessage, 10000));
      setDispPost(editedPost)
      setDispTitle(editedTitle)
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

  const handleChangeTitle = (event) => {
    setEditedTitle(event.target.value);
  };

  const editPost = () => {
    setEdited(!edited)
  }

  const handleChangePost = (event) => {
    setEditedPost(event.target.value);
  };


  return (
    <div className="reported__posts__container">

      {((statusSolved === "all" || (statusSolved === "unsolved" && !solvedStatus) || (statusSolved === "solved" && solvedStatus))
        && (statusBlocked === "all" || (statusBlocked === "unblocked" && !blockedStatus) || (statusBlocked === "blocked" && blockedStatus))) && (
          <div>
            {message && (
              <div className="response">
                {message}
              </div>
            )}

            <div hidden={deleted}>

              <h3 className="home__management__message__title" hidden={edited}>
                {dispTitle}
              </h3>

              <div className="home__management__message__edit" hidden={!edited}>
                <TextField
                  className='input__post'
                  label="Title"
                  variant="outlined"
                  margin="normal"
                  value={editedTitle}
                  onChange={handleChangeTitle}
                />
              </div>

              <div className="post__reported__container" hidden={edited}>
                {dispPost}
              </div>

              <div className='home__management__message__edit' hidden={!edited}>
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

              {username && (
                <div className="home__management__reported__account">
                  <AccountCircleIcon fontSize='small' />
                  <div>
                    {username}
                  </div>
                </div>
              )}
              <div className="home__management__message__footer">
                <div className="home__management__reported__date">
                  {date}
                </div>
                <div className="home__management__message__changed__status">
                  {changed ?
                    <Tooltip title="Post is already changed" aria-label="view__changed__status">
                      <FlagIcon fontSize='small' color="secondary" />
                    </Tooltip>
                    :
                    <Tooltip title="Post is not yet changed" aria-label="view__changed__status">
                      <FlagIcon fontSize='small' />
                    </Tooltip>
                  }
                </div>
                <IconButton onClick={editPost}>
                  <Tooltip title="Edit reported Post" aria-label="change_solve_status">
                    <EditIcon fontSize='small' />
                  </Tooltip>
                </IconButton>
                <IconButton onClick={deletePost} >
                  <Tooltip title="Delete reported post" aria-label="change_solve_status">
                    <DeleteIcon fontSize='small' />
                  </Tooltip>
                </IconButton>
                <IconButton onClick={handleBlockedStatus}>
                  <Tooltip title="Change block status" aria-label="change_solve_status">
                    {blockedStatus ? <LockIcon fontSize='small' /> : <LockOpenIcon fontSize='small' />}
                  </Tooltip>
                </IconButton>
                <IconButton onClick={handleSolvedStatus}>
                  <Tooltip title="Change solve status" aria-label="change_solve_status">
                    {solvedStatus ? <CheckBoxOutlinedIcon fontSize='small' /> : <CheckBoxOutlineBlankOutlinedIcon fontSize='small' />}
                  </Tooltip>
                </IconButton>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default HomeReportedManagement
