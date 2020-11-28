import React from 'react'
import './ResetPassword.css'
import Button from '@material-ui/core/Button';


function ResetPassword() {
  return (
    <div className='container'>
      <div className='reset__container'>
        <h1>Reset Password here</h1>
        
        <div>
            <label className='reset__input__label'>Username:</label>
            <input className='reset__input__field' type="text" id="username" name="username"/>
        </div>
        
        <Button className='reset__button' variant="contained" color="primary" disableElevation>
          Send
        </Button>
      </div>
    </div>
  )
}

export default ResetPassword
