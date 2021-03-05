import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import './Management.css'

import Grid from '@material-ui/core/Grid';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Button from '@material-ui/core/Button'

import UserOverview from './User.Management';
import RolesOverview from './Roles.Management';
import LoginManagement from './Login.Management';
import DeleteManagement from './Delete.Management';
import HomeManagement from './Home.Management';

import { getCurrentUser } from "../services/auth.service";
import ManagementService from '../services/mgt.service'

Modal.setAppElement('body')

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overlay: { zIndex: 9999 }
  }
};

function Management() {
  const [open, setOpen] = useState(false);
  const [jenkinsStatusData, setJenkinsStatusData] = useState();
  const [triggerBuildModal, setTriggerBuildModal] = useState(false);
  const [subPage, setSubPage] = useState(0);
  const [message, setMessage] = useState("");
  const [timerId, setTimerId] = useState();
  const anchorRef = useRef(null);
  const history = useHistory();
  const currentUser = getCurrentUser();

  if (!(currentUser?.rights.includes('READ_MANAGEMNT_VIEW') || currentUser?.rights.includes('ADMIN'))) {
    history.push('/unauthorized')
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event?.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    ManagementService.getBuildStatus().then((response) => {
      setJenkinsStatusData(response.data);
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
  
    prevOpen.current = open;
  }, [open]);

  const handleclickChangeHome = () => {
    setSubPage(0)
  }

  const handleclickChangeSubpageUsr = (page) => {
    if (subPage === 1) {
      setSubPage(0)
    } else {
      setSubPage(1)
    }
  }

  const handleclickChangeSubpageRole = (page) => {
    if (subPage === 2) {
      setSubPage(0)
    } else {
      setSubPage(2)
    }
  }

  const handleclickChangeSubpageLogin = (page) => {
    if (subPage === 3) {
      setSubPage(0)
    } else {
      setSubPage(3)
    }
    handleClose()
  }

  const handleclickChangeSubpageDelete = (page) => {
    if (subPage === 4) {
      setSubPage(0)
    } else {
      setSubPage(4)
    }
    handleClose()
  }

  const triggerBuild = () => {
    handleTriggerModal()
    removeMessage()
    clearTimeout(timerId)

    ManagementService.triggerBuild().then((response) => {
      setMessage(response.data.message);
      setTimerId(setTimeout(removeMessage, 10000));
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

  const handleTriggerModal = () => {
    setTriggerBuildModal(!triggerBuildModal)
  }

  function removeMessage() {
    setMessage("")
  }

  return (
    <div>
      <h1>The side for the admin to controll access.</h1>
      {message && (
        <div className="response">
          {message}
        </div>
      )}
      <Grid container spacing={1}>
        <Grid item sm={2}>
          <MenuList>
            <MenuItem onClick={handleclickChangeHome}>Home</MenuItem>
            {(currentUser?.rights.includes('READ_USER_MANAGEMENT') || currentUser?.rights.includes('ADMIN')) && (
              <MenuItem onClick={handleclickChangeSubpageUsr} >User</MenuItem>)}
            {(currentUser?.rights.includes('READ_ROLE_MANAGEMENT') || currentUser?.rights.includes('ADMIN')) && (
              <MenuItem onClick={handleclickChangeSubpageRole}>Roles</MenuItem>)}
            {(currentUser?.rights.includes('READ_VIEW_LOGIN') || currentUser?.rights.includes('READ_VIEW_DELETE') || currentUser?.rights.includes('ADMIN')) && (
              <MenuItem
                onClick={handleToggle}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true">Views</MenuItem>)}
            {(currentUser?.rights.includes('TRIGGER_BUILD') || currentUser?.rights.includes('ADMIN')) && (
              <MenuItem onClick={handleTriggerModal}>
                <div className="trigger__build__button" >
                  Trigger build process
                </div>
              </MenuItem>)}
          </MenuList>

          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      {(currentUser?.rights.includes('READ_VIEW_LOGIN') || currentUser?.rights.includes('ADMIN')) && (
                        <MenuItem onClick={handleclickChangeSubpageLogin}>Log-In</MenuItem>)}
                      {(currentUser?.rights.includes('READ_VIEW_DELETE') || currentUser?.rights.includes('ADMIN')) && (
                        <MenuItem onClick={handleclickChangeSubpageDelete}>Delete</MenuItem>)}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Grid>
        <Grid item sm={10}>
          <div className="management__container">
            {subPage === 0 && (
              <HomeManagement />
            )}
            {subPage === 1 && (
              <UserOverview />
            )}
            {subPage === 2 && (
              <RolesOverview />
            )}
            {subPage === 3 && (
              <LoginManagement />
            )}
            {subPage === 4 && (
              <DeleteManagement />
            )}
          </div>
        </Grid>
      </Grid>
      <Modal
        isOpen={triggerBuildModal}
        onRequestClose={handleTriggerModal}
        style={customStyles}
        contentLabel="Trigger__Build"
      >
        <div className='modal__trigger__build'>
          <h3>Trigger build process</h3>
          <p>Are you sure that you want to trigger the build process?</p>


          <table border="1" cellPadding="5" cellSpacing="5">
            <thead>
              <tr>
                <th>Pipeline Name</th>
                <th>Last Run</th>
              </tr>
            </thead>
            <tbody>
              {jenkinsStatusData?.map((item, i) => (
                <tr key={i}>
                  <td>{item[0]}</td>
                  <td>{item[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>


          <div />
          <Button variant="contained" onClick={triggerBuild} color="primary">Trigger</Button>
          <Button variant="contained" onClick={handleTriggerModal}>Cancel</Button>
        </div>
      </Modal>
    </div>
  )
}

export default Management