import React from 'react'
import './Home.Message.Management.css'

import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


function HomeMessageManagement({ id, date, body, reason, solved, mail }) {
  return (
    <div className="home__management__message">
      <h3 className="home__management__message__reason">{reason}</h3>
      <div className="home__management__message__body">{body}</div>
      <div className="home__management__message__footer">
        {date}
        {mail}
        <IconButton>
          <Tooltip title="Change password from user" aria-label="change_user_password">
            {solved ? <CheckBoxOutlinedIcon fontSize='small'/> : <CheckBoxOutlineBlankOutlinedIcon fontSize='small'/>}
          </Tooltip>
        </IconButton>
      </div>
    </div>
  )
}

export default HomeMessageManagement