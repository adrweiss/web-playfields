import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { logout, getCurrentUser } from "./services/auth.service"


function Header() {
  const handleClick = () => {
    logout()
  }

  const currentUser = getCurrentUser();

  return (
    <div>
      <nav className="header">
        <div className='header__Nav'>
          <Link to="/" className="header__link">
            <div className="header__option">
              {'Home'}
            </div>
          </Link>

          <Link to="/game" className="header__link">
            <div className="header__option">
              {'Connect Four'}
            </div>
          </Link>
          {!currentUser && (
          <Link to="/login" className="header__link">
            <div className="header__option">
              {"Login"}
            </div>
          </Link>
          )}
          {currentUser && (
            <Link to="/user" className="header__link" >
              <div className="header__option">
                {"User"}
              </div>
            </Link>
          )}
          <Link to="/management" className="header__link">
            <div className="header__option">
              {"Management"}
            </div>
          </Link>
          {currentUser && (
            <div onClick={handleClick} className="header__link">
              <div className="header__option">
                {"Logout"}
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}


export default Header