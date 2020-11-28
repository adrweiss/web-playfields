import React from 'react'
import Button from '@material-ui/core/Button';
import './User.css'
import DeleteIcon from '@material-ui/icons/Delete';


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
    <div className='container'>   
        <div className='user__change__container'>
          <h1>User-Self-Service-Page</h1> 
          {`Here you can change your nickname. Your current nickname is ${currentNickname}. Your nickname must be unique.`}
          <div>
              <label className='user__input__label'>New nickname</label>
              <input className='user__input__field' type="text" id="username" name="username"/>
          </div>
          <div className="nickname__change">
            <Button className='accept__new__nickname' variant="contained" color="primary" disableElevation>
              Accept 
            </Button>
          </div>
          
          <div className='change__password__section'>
          {`Here you can change your current password.`}
            <label className='user__input__label__pw'>Old password:</label>
            <input className='user__input__field__pw' type="password" id="pass" name="password"
              minlength="8" required/>
          </div>

          <div>
            <label className='user__input__label__pw'>New Password:</label>
            <input className='user__input__field__pw' type="password" id="pass" name="password"
              minlength="8" required/>
          </div>
          
          <div>
            <label className='user__input__label__pw'>New Password again:</label>
            <input className='user__input__field__pw' type="password" id="pass" name="password"
              minlength="8" required/>
          </div>
          

          <Button className='accept__new__password' variant="contained" color="primary" disableElevation>
            Accept new password
          </Button>
          
          <div className='delete__profile__Section'>
            <div className='delete__profile__Section__v2'>
              <Button className='delete__new__password' variant="contained" color="secondary" startIcon={<DeleteIcon />}>
                Delete Profile
              </Button>
            </div>
          </div>
          
        </div>
      </div>
      <div className='container'>   
        <div className='user__rights__container'>
          <h1>The User will be able to see all his rights on this screen</h1> 
        </div>
      </div>
    </div>
  )
}

export default User
