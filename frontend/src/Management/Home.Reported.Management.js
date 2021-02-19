import React, { useState } from 'react'
import './Home.Reported.Management.css'

import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FlagIcon from '@material-ui/icons/Flag';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

function HomeReportedManagement({ id, username, body, title, solved, blocked, changed, date }) {
  const [solvedStatus, setSolvedStatus] = useState(solved);
  const [blockedStatus, setBlockedStatus] = useState(blocked);

  return (
    <div className="reported__posts__container">
      <h3 className="home__management__message__title">{title}</h3>
      <div className="post__reported__container">
        {body}
      </div>
      <div>
        username, date
      </div>
      <div className="home__management__message__footer">
        <div className="home__management__message__date">
          {date}
        </div>
        <IconButton >
          <Tooltip title="Change solve status" aria-label="change_solve_status">
            <EditIcon fontSize='small' />
          </Tooltip>
        </IconButton>
        <IconButton >
          <Tooltip title="Change solve status" aria-label="change_solve_status">
            <DeleteIcon fontSize='small' />
          </Tooltip>
        </IconButton>
        <IconButton >
          <Tooltip title="Change solve status" aria-label="change_solve_status">
            {changed ? <FlagIcon fontSize='small' /> : <FlagIcon fontSize='small' />}
          </Tooltip>
        </IconButton>
        <IconButton >
          <Tooltip title="Change solve status" aria-label="change_solve_status">
            {blockedStatus ? <LockIcon fontSize='small' /> : <LockOpenIcon fontSize='small' />}
          </Tooltip>
        </IconButton>
        <IconButton >
          <Tooltip title="Change solve status" aria-label="change_solve_status">
            {solvedStatus ? <CheckBoxOutlinedIcon fontSize='small' /> : <CheckBoxOutlineBlankOutlinedIcon fontSize='small' />}
          </Tooltip>
        </IconButton>
      </div>
    </div>
  )
}

export default HomeReportedManagement
