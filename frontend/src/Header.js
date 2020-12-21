import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { logout, getCurrentUser } from "./services/auth.service"
import { useHistory } from 'react-router-dom';
import UserService from './services/user.service';



function Header() {
  var currentUser = getCurrentUser();
  const history = useHistory();
  
  var rights = []

  if (currentUser !== null) {
    rights = currentUser.rights
  }

  const handleClickLogout = () => {
    logout()
    history.push('/login')
  }


  setInterval(function() {
    if (currentUser != null) {
      if (currentUser.expire <= Math.floor(new Date().getTime() / 1000)) {
        logout()
        history.push('/login')
      }
      
      UserService.getRights().then(response => {
        if (currentUser.righs !== response.data.rights){
          localStorage.setItem("user", JSON.stringify(currentUser));
          window.location.reload()
        }
      })
    }
  }, 300000);

  

  return (
    <div>
      <nav className="header">
        <div className='header__Nav'>
          <Link to="/" className="header__link">
            <div>
              {'Home'}
            </div>
          </Link>

          <Link to="/game" className="header__link">
            <div>
              {'Connect Four'}
            </div>
          </Link>

          {!currentUser && (
            <Link to="/login" className="header__link">
              <div>
                {"Login"}
              </div>
            </Link>
          )}


          <Link to="/user" className="header__link" hidden={!(rights.includes('READ_USER_VIEW') || rights.includes('ADMIN'))}>
            <div>
              {"User"}
            </div>
          </Link>
          
          <Link to="/management" className="header__link" hidden={!(rights.includes('READ_MANAGEMNT_VIEW') || rights.includes('ADMIN'))}>
            <div>
              {"Management"}
            </div>
          </Link>

          {currentUser && (
            <Link to='/login' onClick={handleClickLogout} className="header__link">
              <div className='header__logout'>
                {"Logout"}
              </div>
            </Link>
          )}
        </div>
      </nav>
    </div>
  )
}


export default Header