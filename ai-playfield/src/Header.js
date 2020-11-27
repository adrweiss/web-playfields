import React from 'react'
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
        <Link to="/" className="header__link">
          <div className="header__option">
              {'4 Wins | Tic/Tac/Toe'}
          </div>
        </Link>
        <Link to="/" className="header__link">
          <div className="header__option">
              {"Login"}
          </div>
        </Link>
        <Link to="/" className="header__link">
          <div className="header__option">
              {"rights management"}
          </div>
        </Link>
        <Link to="/" className="header__link">
          <div className="header__option">
              {"side stats"}
          </div>
        </Link>
        <Link to="/" className="header__link">
          <div className="header__option">
              {"game stats"}
          </div>
        </Link>
      </nav>
    </div>
  )
}


export default Header
