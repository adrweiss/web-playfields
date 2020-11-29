import React from 'react'
import Button from '@material-ui/core/Button';
import './User.css'
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';


function User() {
  const currentNickname = 'TestName'

  const rights = [
    {
      "name": "1 Right",
      "description": 'thats a text which descrips the right'
    },
    {
      "name": "2 Right",
      "description": 'thats a text which descrips the right'
    }, 
    {
      "name": "3 Right",
      "description": 'thats a text which descrips the right'
    },
    {
      "name": "4 Right",
      "description": 'thats a text which descrips the right'
    },
    {
      "name": "5 Right",
      "description": 'thats a text which descrips the right'
    }
  ]

  return (
    <div> 
      <h1>User Self Service</h1> 
      <Grid container spacing={3}>  
        <Grid item xs={12} sm={6}>
        <h2>Change your user settings</h2>

          {`Here you can change your nickname. Your current nickname is ${currentNickname}. Your nickname must be unique.`}
          <div>
              <label className='user__input__label'>New nickname</label>
              <input className='user__input__field' type="text" id="username" name="username"/>
          </div>

            <Button className='accept__new__nickname' variant="contained" color="primary" disableElevation>
              Accept 
            </Button>
          
          <div className='change__password__section'>
            {`Here you can change your current password.`}
            <label className='user__input__label__pw'>Old password:</label>
            <input className='user__input__field__pw' type="password" id="pass" name="password"
              minlength="8" required/>
          </div>
          <div>
            <label className='user__input__label__pw'>New Password:</label>
            <input className='user__input__field__pw' type="password" id="pass" name="password"
              minlength="8" required/>
          </div>
          
          <div>
            <label className='user__input__label__pw'>New Password again:</label>
            <input className='user__input__field__pw' type="password" id="pass" name="password"
              minlength="8" required/>
          </div>
          
          <Button  variant="contained" color="primary" disableElevation>
            Accept new password
          </Button>
          


              <Button  variant="contained" color="secondary" startIcon={<DeleteIcon />}>
                Delete Profile
              </Button>

          
        </Grid>
        <Grid item xs={12} sm={6}>
          <h2>List of your roles and rights</h2>
          diest ist ein Test
        </Grid>
      </Grid>
    </div>
  )
}

export default User
