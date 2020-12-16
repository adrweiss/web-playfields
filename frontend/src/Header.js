import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { logout, getCurrentUser } from "./services/auth.service"
import { useHistory } from 'react-router-dom';



function Header() {
  const currentUser = getCurrentUser();
  const history = useHistory();
  var rights = []

  if (currentUser !== null) {
    rights = currentUser.rights
  }

  const handleClick = () => {
    logout()
    history.push('/login')
  }

  function timeout() {
    if (currentUser != null) {
      if (currentUser.expire <= Math.floor(new Date().getTime() / 1000)) {
        logout()
        history.push('/login')
      }
    }
  }

  timeout()

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
            <Link to='/login' onClick={handleClick} className="header__link">
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