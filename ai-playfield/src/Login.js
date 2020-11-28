import React from 'react'
import { Link } from 'react-router-dom';
import './Login.css'

function Login() {
  return (
    <div className='container'>
      <div className='login__container'>
        <div>
          <h1 className='headline'>Please login</h1>       
        </div>

        <div>
          <label className='input__label'>Username:</label>
          <input className='input__field' type="text" id="username" name="username"/>
        </div>

        <div>
          <label className='input__label'>Password:</label>
          <input className='input__field' type="password" id="pass" name="password"
            minlength="8" required/>
        </div>

        <button className='sign__in'>Sign in</button>

        <Link to="/user/newusr" className="user__link">
          <div className="link">
              {'Create new User'}
          </div>
        </Link> 
        
        <Link to="/user/resetpw" className="user__link">
          <div className="link">
              {'Reset Password'}
          </div>
        </Link>      
      </div>
    </div>
  )
}

export default Login
