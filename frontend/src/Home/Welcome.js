import React, { useState } from 'react'
import './Welcome.css'

import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import TextField from '@material-ui/core/TextField';
//import Button from '@material-ui/core/Button'

function Welcome({ id, title, body }) {
  const [edited, setEdited] = useState(false)
  const [dispTitle, setDispTitle] = useState(title)
  const [editedTitle, setEditedTitle] = useState(title)
  const [dispBody, setDispBody] = useState(body)
  const [editedBody, setEditedBody] = useState(body)

  body = body.replace(/\\n/g, "\n");

  const handleChangeTitle = (event) => {
    setEditedTitle(event.target.value);
  };

  const handleChangeBody = (event) => {
    setEditedBody(event.target.value);
  };

  const editPost = () => {
    setEdited(!edited)
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
        <div>
          <IconButton onClick={editPost}>
            <Tooltip title="Edit description" aria-label="edit_description">
              <EditIcon fontSize="small" />
            </Tooltip>
          </IconButton>
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
    </div>
  )
}



export default Welcome
