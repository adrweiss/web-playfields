import React, { useState, useRef, useEffect } from 'react'
import './Management.css'
import Grid from '@material-ui/core/Grid';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { useHistory } from 'react-router-dom';
import UserOverview from './User.Management';
import RolesOverview from './Roles.Management';
import LoginManagement from './Login.Management';
import DeleteManagement from './Delete.Management';
import { getCurrentUser } from "../services/auth.service";

function Management() {
  const [open, setOpen] = useState(false);
  const [subPage, setSubPage] = useState(0);
  const anchorRef = useRef(null);
  const history = useHistory();
  const currentUser = getCurrentUser();

  var rights = []

  if (currentUser !== null) {
    rights = currentUser.rights
  }
  

  if (!(rights.includes('READ_MANAGEMNT_VIEW') || rights.includes('ADMIN'))) {
    history.push('/unauthorized')
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
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

    prevOpen.current = open;
  }, [open]);

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
    if (subPage === 2) {
      setSubPage(0)
    } else {
      setSubPage(3)
    }
    //handleClose()
  }

  const handleclickChangeSubpageDelete = (page) => {
    if (subPage === 2) {
      setSubPage(0)
    } else {
      setSubPage(4)
    }
    //handleClose()
  }
  return (
    <div>
      <h1>The side for the admin to controll access.</h1>
      <Grid container spacing={3}>
        <Grid item sm={2}>
          <MenuList>
            {(rights.includes('READ_USER_MANAGEMENT') || rights.includes('ADMIN')) && (
              <MenuItem onClick={handleclickChangeSubpageUsr} >User</MenuItem>)}
            {(rights.includes('READ_ROLE_MANAGEMENT') || rights.includes('ADMIN')) && (
              <MenuItem onClick={handleclickChangeSubpageRole}>Roles</MenuItem>)}
            {(rights.includes('READ_VIEW_LOGIN') || rights.includes('READ_VIEW_DELETE') || rights.includes('ADMIN')) && (
              <MenuItem
                onClick={handleToggle}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true">Views</MenuItem>)}
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
                      {(rights.includes('READ_VIEW_LOGIN') || rights.includes('ADMIN')) && (
                        <MenuItem onClick={handleclickChangeSubpageLogin}>Log-In</MenuItem>)}
                      {(rights.includes('READ_VIEW_DELETE') || rights.includes('ADMIN')) && (
                        <MenuItem onClick={handleclickChangeSubpageDelete}>Delete</MenuItem>)}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Grid>
        <Grid item sm={10}>
          {subPage === 0 && (
            <div className="startpage">
              This is the Management Overview. From this start side you have access to all the relevant administration stuff. It is possible that you don't have access to everything. This depends on your personal rights.
            </div>
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
        </Grid>
      </Grid>
    </div>
  )
}

export default Management