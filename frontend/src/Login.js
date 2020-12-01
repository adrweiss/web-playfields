import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

function Login() {
  return (
    <div className='container'>
      <div className='login__container'>
        <h1>Please login</h1>       
        
        <div>
          <label className='input__label'>Username:</label>
          <input className='input__field' type="text" id="username" name="username"/>
        </div>

        <div>
          <label className='input__label'>Password:</label>
          <input className='input__field' type="password" id="pass" name="password"
             minLength="8" required/>
        </div>

        <div className='sign__in'>
          <Button className='sign__in__button' variant="contained" color="primary" disableElevation>
            Sign in 
          </Button>
        </div>

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
