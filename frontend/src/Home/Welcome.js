import React, { useState } from 'react'
import './Welcome.css'

import { getCurrentUser, getTempDescription } from "../services/auth.service"
import HomeService from "../services/home.service.js"

import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

function Welcome({ id, title, body, visible, newItem, serial_number }) {
  const [visibleStatus, setVisibleStatus] = useState(visible)
  const [edited, setEdited] = useState(newItem ? true : false)
  const [dispTitle, setDispTitle] = useState(title)
  const [editedTitle, setEditedTitle] = useState(title)
  const [dispBody, setDispBody] = useState(body)
  const [editedBody, setEditedBody] = useState(body)

  const currentUser = getCurrentUser();

  const handleChangeTitle = (event) => {
    setEditedTitle(event.target.value);
  };

  const handleChangeBody = (event) => {
    setEditedBody(event.target.value);
  };

  const editDescription = () => {
    setEdited(!edited)
  }

  const saveEdit = () => {
    setDispTitle(editedTitle)
    setDispBody(editedBody)
    setEdited(!edited)

    HomeService.editDescription(id, editedTitle, editedBody).then((response) => {
      console.log(response.data.message)
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

  const addDescription = () => {
    setDispTitle(editedTitle)
    setDispBody(editedBody)
    setEdited(!edited)

    HomeService.addDescription(editedTitle, editedBody, serial_number, visibleStatus).then((response) => {        
      let tempDesc = getTempDescription()
      tempDesc = tempDesc.filter(element => element.newId !== id)
      tempDesc = [...tempDesc, { "newId": id, "regId":  response.data.id}]
      localStorage.setItem("newDesc", JSON.stringify(tempDesc));      
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

  const cancelEdit = () => {
    setEditedTitle(dispTitle)
    setEditedBody(dispBody)
    setEdited(!edited)
  }

  const handleVisibleStatus = () => {
    (newItem ? setVisibleStatus(!visibleStatus) :
      HomeService.setStatusVisibleDesc(id, !visibleStatus).then((response) => {
        setVisibleStatus(!visibleStatus)
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
    )
  }

  return (
    <div className="welcomme__container">
      <div className="welcome__title__box">
        <div className="box__description">
          <h2 hidden={edited}>{dispTitle}</h2>
          <div hidden={!edited}>
            <TextField
              className='input__description'
              label="Description title"
              variant="outlined"
              margin="normal"
              value={editedTitle}
              onChange={handleChangeTitle}
            />
          </div>
        </div>
        <div className="edit__and__blocked__sign" >
          <div hidden={!(currentUser?.rights.includes('EDIT_DISCRIPTION_HOME') || currentUser?.rights.includes('ADMIN'))}>
            <IconButton onClick={handleVisibleStatus}>
              <Tooltip title="Change visible status">
                {visibleStatus ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />}
              </Tooltip>
            </IconButton>
          </div>
          <div hidden={(edited || !(currentUser?.rights.includes('EDIT_DISCRIPTION_HOME') || currentUser?.rights.includes('ADMIN')))}>
            <IconButton onClick={editDescription}>
              <Tooltip title="Edit description">
                <EditIcon fontSize="small" />
              </Tooltip>
            </IconButton>
          </div>
        </div>
      </div>
      <div hidden={edited} className="welcome__body__box">{dispBody}</div>
      <div hidden={!edited}>
        <TextField
          className='input__description'
          label="Description"
          multiline
          variant="outlined"
          margin="normal"
          value={editedBody}
          onChange={handleChangeBody}
        />
      </div>
      <div className='welcome__edit__container' hidden={!edited}>
        <p hidden={!edited}>
          <Button
            className='edit__button'
            variant="contained"
            color="primary"
            onClick={(newItem ? addDescription : saveEdit)}
          >
            Save
        </Button>
        </p>
        <p hidden={!edited}>
          <Button
            className='edit__button'
            variant="contained"
            onClick={cancelEdit}
          >
            Cancel
        </Button>
        </p>
      </div>
    </div>
  )
}

export default Welcome