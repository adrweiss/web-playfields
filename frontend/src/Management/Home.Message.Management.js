import React, { useState } from 'react'
import './Home.Message.Management.css'

import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import ManagementService from "../services/mgt.service"

function HomeMessageManagement({ id, date, body, reason, solved, mail, type, status }) {
  const [solvedStatus, setSolvedStatus] = useState(solved);

  function setBugStatus() {
    ManagementService.putBugStatus(id, !solvedStatus).then((response) => {
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

  function setContactStatus() {
    ManagementService.putContactStatus(id, !solvedStatus).then((response) => {
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

  const handleSolvedStatus = () => {
    setSolvedStatus(!solvedStatus)

    if (type === "bug") {
      setBugStatus()
    } else if (type === "contact") {
      setContactStatus()
    } else {
      console.log("Some settings are wrong. It is not possible to change the status.")
    }
  }
  return (
    <div className="home__management__message">
      {(status === "all" || (status === "unsolved" && !solvedStatus) || (status === "solved" && solvedStatus)) && (
        <div>
          <h3 className="home__management__message__reason">{reason}</h3>
          <div className="home__management__message__body">{body}</div>
          {mail && (
            <div className="home__management_message__mail">{mail}</div>
          )}
          <div className="home__management__message__footer">
            <div className="home__management__message__date">
              {date}
            </div>
            <IconButton onClick={handleSolvedStatus}>
              <Tooltip title="Change solve status" aria-label="change_solve_status">
                {solvedStatus ? <CheckBoxOutlinedIcon fontSize='small' /> : <CheckBoxOutlineBlankOutlinedIcon fontSize='small' />}
              </Tooltip>
            </IconButton>

          </div>
        </div>
      )}
    </div>
  )
}

export default HomeMessageManagement