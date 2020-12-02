import React from 'react'
import Button from '@material-ui/core/Button';
import './User.css'
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';


function User() {
  const currentNickname = 'TestName'
  /*
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
*/
  return (
    <div> 
      <h1>User Self Service</h1> 
      <Grid container spacing={3}>  
        <Grid item xs={12} sm={6}>
          <div className="container__user">
            <h2>Change your user settings</h2>
            
            {`Here you can change your nickname. Your current nickname is ${currentNickname}. It is not necessary that your user is unique.`}

            <div className="change__nickname">
              <label>New nickname</label>
              <input type="text" id="username" name="username"/>
              <Button variant="contained" color="primary" disableElevation>
                Accept 
              </Button>
            </div>

            <p>`Here you can change your current password.`</p>

            <div className='change__password__section'>            
              <label>Old password:</label>
              <input type="password" id="old_pass" name="password" minLength="8" required/>
              <label>New Password:</label>
              <input type="password" id="new_pass" name="password" minLength="8" required/>
              <label>New Password again:</label>
              <input type="password" id="new_again_pass" name="password" minLength="8" required/>
              <Button  variant="contained" color="primary" disableElevation>
                Accept new password
              </Button>
            </div>

            <div className='delete__profile'>
              <Button  variant="contained" color="secondary" startIcon={<DeleteIcon/>}>
                Delete Profile
              </Button>
            </div>
          </div>
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
