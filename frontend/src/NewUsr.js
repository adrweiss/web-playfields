import React from 'react'
import Button from '@material-ui/core/Button';
import './NewUsr.css'

function NewUsr() {
  return (
    <div className='container'>   
      <div className='create__container'>
        <h1>Create New User</h1>
        
        <div>
            <label className='create__input__label'>E-Mail:</label>
            <input className='create__input__field' type="text" id="username" name="username"/>
        </div>

        <div>
          <label className='create__input__label'>Password:</label>
          <input className='create__input__field' type="password" id="pass" name="password"
            minlength="8" required/>
        </div>

        <div>
          <label className='create__input__label'>Password again:</label>
          <input className='create__input__field' type="password" id="pass" name="password"
            minlength="8" required/>
        </div>
        
        <Button className='create__button' variant="contained" color="primary" disableElevation>
          Create
        </Button>
      </div>
    </div>
  )
}

export default NewUsr
