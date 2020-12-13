import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import './NewUsr.css';
import axios from './axios';

import { register } from "./services/auth.service"


function NewUsr() {
  const [successful, setSuccessful] = useState(false);

  const handleClick = () => {
    var email = document.getElementById('email').value
    var password_1 = document.getElementById('pass').value
    var password_2 = document.getElementById('pass_again').value
    var username = 'karl'
    
    if (password_1 === password_2) {
      register(username, email, password_1).then(
        (response) => {
          console.log(response.data.message)
          //setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log(resMessage)
          //setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  }

  return (
    <div className='create__container'>
      <h1>Create New User</h1>

      <div className='create__new__user'>
        <label>E-Mail:</label>
        <input type="text" id="email" name="email" />
        <label>Password:</label>
        <input type="password" id="pass" name="password" minLength="8" required />
        <label>Password again:</label>
        <input type="password" id="pass_again" name="password" minLength="8" required />
        <Button variant="contained" color="primary" onClick={handleClick}>
          Create
        </Button>
      </div>
    </div>
  )
}

export default NewUsr
