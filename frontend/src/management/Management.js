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
import UserOverview from './User.Overview';
import RolesOverview from './Roles.Overview';
import { getCurrentUser } from "../services/auth.service";

function Management() {
  const [open, setOpen] = useState(false);
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

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <div>
      <h1>The side for the admin to controll access.</h1>
      <Grid container spacing={3}>
        <Grid item sm={2}>
          <MenuList>
            <MenuItem>User</MenuItem>
            <MenuItem>Roles</MenuItem>
            <MenuItem
              onClick={handleToggle}
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true">Views</MenuItem>
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
                      <MenuItem onClick={handleClose}>Log-In</MenuItem>
                      <MenuItem onClick={handleClose}>Delete</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Grid>
        <Grid item sm={10}>
         <UserOverview />
        </Grid>
      </Grid>
    </div>
  )
}

export default Management