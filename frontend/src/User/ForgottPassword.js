import React, { useState } from 'react';
import './ForgottPassword.css'
import queryString from 'query-string';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function ForgottPassword() {
  const [password, setPassword] = useState(false);
  const [passwordRepeat, setPasswordRepeat] = useState(false);

  var urlParam = queryString.parse(window.location.search)
  console.log(urlParam.rk)

  const handleForgottPassword = () => {
    if (password.value === passwordRepeat.value) {
      console.log(password.value)
    }
  };

  return (
    <div className='reset'>
      <h1>Reset your password</h1>
      <div className='reset__password'>
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
