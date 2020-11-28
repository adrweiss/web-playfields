import React from 'react';
import Button from '@material-ui/core/Button';
import './NewUsr.css';
import axios from './axios';


function NewUsr() {
  const handleClick = () => {
    var username = document.getElementById('username').value
    var password_1 = document.getElementById('pass').value
    var password_2 = document.getElementById('pass_again').value
    
    if (password_1 === password_2) {
      axios.post('/users', {
          'email': username,
          'pword': password_1
        })
        .then((response) => {
          console.log(response);
        }, (error) => {
          console.log(error);
        });
    } else {
      alert('the passwords does mot match!')
    }
  }

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
          <input className='create__input__field' type="password" id="pass_again" name="password"
            minlength="8" required/>
        </div>
        
        <Button className='create__button' variant="contained" color="primary" onClick={handleClick}>
          Create
        </Button>
      </div>
    </div>
  )
}

export default NewUsr
