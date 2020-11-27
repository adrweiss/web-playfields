import React from 'react'
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div>
      <div>
        <h1>The Login Screen will be placed here.</h1>       
      </div>
      <div>
        <span>E-Mail</span>
      </div>
      <div>
        <span>PW</span>
      </div>
      <Link to="/user/newusr" className="user__link">
        <div className="create__new__user">
            {'Create new User'}
        </div>
      </Link> 
      
      <Link to="/user/resetpw" className="user__link">
        <div className="create__new__user">
            {'Reset Password'}
        </div>
      </Link>      
    </div>
  )
}

export default Login
