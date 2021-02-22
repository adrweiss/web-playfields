import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { logout, getCurrentUser } from "./services/auth.service"
import { useHistory } from 'react-router-dom';
import UserService from './services/user.service';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  var currentUser =getCurrentUser();

  if (currentUser?.expire <= Math.floor(new Date().getTime() / 1000)) {
    logout()
    currentUser = getCurrentUser();
  } 

  const handleClickLogout = () => {
    logout()
    setAnchorEl(null);
    history.push('/login')
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  setInterval(function () {
    if (currentUser != null) {
      if (currentUser.expire <= Math.floor(new Date().getTime() / 1000)) {
        logout()
        history.push('/login')
      }

      UserService.getRights().then(response => {
        if (response.data.rights?.length === 0) {
          logout()
          console.log("This user is blocked, please contact the admin!")
        } else {
          if (currentUser.righs !== response.data.rights) {
            localStorage.setItem("user", JSON.stringify(currentUser));
            window.location.reload()
          }
        }
      },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          console.log(_content);
        }
      )
    }
  }, 300000);



  return (
    <div>
      <nav className="header">

        <div className='header__Nav'>
          <Link to="/" className="header__link">
            {'Home'}
          </Link>

          <Link to="/game" className="header__link">
            {'Connect Four'}
          </Link>
        </div>

        <div className='header__user'>
          <div className='user__icon'>

            <Link to="/login" className="header__link" hidden={currentUser}>
              <AccountCircleIcon fontSize="large" />
            </Link>


            <Link to="/user" className="header__link" hidden={!(currentUser?.rights.includes('READ_USER_VIEW') || currentUser?.rights.includes('ADMIN'))}>
              <AccountCircleIcon fontSize="large" />
            </Link>
          </div>
        </div>

        {currentUser && (
          <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <div className="header__username">
                {currentUser?.username}
              </div>
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link to="/user" className='menu__link__header' hidden={!(currentUser?.rights.includes('READ_USER_VIEW') || currentUser?.rights.includes('ADMIN'))}>
                  {"Profil"}
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/management" className='menu__link__header' hidden={!(currentUser?.rights.includes('READ_MANAGEMNT_VIEW') || currentUser?.rights.includes('ADMIN'))}>
                  {"Management"}
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </nav>
      {(currentUser && !currentUser?.validate) && (
        <div className='account__validation'>
          Your account is not valid. Please follow the link the email that you got.
        </div>
      )}
    </div >
  )
}


export default Header