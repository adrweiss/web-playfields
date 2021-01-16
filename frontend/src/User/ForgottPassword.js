import React, { useState } from 'react';
import './ForgottPassword.css'
import queryString from 'query-string';
import UserService from "../services/user.service";

import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function ForgottPassword() {
  const [password, setPassword] = useState(false);
  const [passwordRepeat, setPasswordRepeat] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();

  var urlParam = queryString.parse(window.location.search)

  const handleForgottPassword = () => {
    if (password.value === passwordRepeat.value) {
      UserService.setPassword(urlParam.fp, password.value).then(
        (response) => {
          console.log(response.data.message)
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
    }
  };

  return (
    <div className='reset'>
      <h1>Reset your password</h1>
      <div className='reset__password'>

        {message && (
          <div className="response">
            {message}
          </div>
        )}

        <TextField
          className="input__reset__password"
          label="Password"
          type="password"
          margin="normal"
          variant="outlined"
          inputRef={element => setPassword(element)}
        />

        <TextField
          className="input__reset__password"
          label="Password repeat"
          type="password"
          margin="normal"
          variant="outlined"
          inputRef={element => setPasswordRepeat(element)}
        />

        <Button className='input__reset__password' variant="contained" color="primary" onClick={handleForgottPassword}>
          Create
        </Button>
      </div>
    </div>
  )
}

export default ForgottPassword
