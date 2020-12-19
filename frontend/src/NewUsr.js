import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import './NewUsr.css';
import { register } from "./services/auth.service"
import { useHistory } from 'react-router-dom';


function NewUsr() {
  const [message, setMessage] = useState("");
  const history = useHistory();

  const handleClick = () => {
    var email = document.getElementById('email').value
    var password_1 = document.getElementById('pass').value
    var password_2 = document.getElementById('pass_again').value
    var username = document.getElementById('username').value

    if (password_1 === password_2) {
      register(username, email, password_1).then(
        (response) => {
          console.log(response.data.message)
          //setMessage(response.data.message);
          history.push('/login')
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
        }
      )
    } else {
      setMessage('The passwords does not match.');
    }
  }

  return (
    <div className='create__container'>
      <h1>Create New User</h1>

      <div className='create__new__user'>
        {message && (
          <div className="response">
            {message}
          </div>
        )}

        <label>Username:</label>
        <input type="text" id="username" name="username" />
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
