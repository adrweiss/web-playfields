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

import ManagementService from "../services/mgt.service"

function HomeReportedManagement({ id, username, body, title, solved, blocked, changed, date }) {
  const [solvedStatus, setSolvedStatus] = useState(solved);
  const [blockedStatus, setBlockedStatus] = useState(blocked);

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
        <IconButton >
          <Tooltip title="Edit reported Post" aria-label="change_solve_status">
            <EditIcon fontSize='small' />
          </Tooltip>
        </IconButton>
        <IconButton >
          <Tooltip title="Delete reported post" aria-label="change_solve_status">
            <DeleteIcon fontSize='small' />
          </Tooltip>
        </IconButton>
        <IconButton >
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
  )
}

export default HomeReportedManagement
