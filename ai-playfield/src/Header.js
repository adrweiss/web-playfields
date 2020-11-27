import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';


function Header() {
  return (
    <div>
      <nav className="header">
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
         
        <Link to="/login" className="header__link">
          <div className="header__option">
              {"Login"}
          </div>
        </Link>
        <Link to="/user" className="header__link">
          <div className="header__option">
              {"User"}
          </div>
        </Link>
        <Link to="/management" className="header__link">
          <div className="header__option">
              {"Management"}
          </div>
        </Link>
      </nav>
    </div>
  )
}


export default Header
