import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import './NewUsr.css';
import { register } from "./services/auth.service"
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';


function NewUsr() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [passwordRepeat, setPasswordRepeat] = useState(false);
  const history = useHistory();

  const handleClick = () => {
    if (password.value === passwordRepeat.value) {
      register(username.value, email.value, password.value).then(
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

        <TextField
          className="input__create__user"
          label="Username "
          inputRef={element => setUsername(element)}
          variant="outlined"
          margin="normal"
        />
        
        <TextField
          className="input__create__user"
          label="E-Mail "
          inputRef={element => setEmail(element)}
          variant="outlined"
          margin="normal"
        />
        <TextField
          className="input__create__user"
          label="Password"
          type="password"
          margin="normal"
          inputRef={element => setPassword(element)}
          variant="outlined"
        />
        
        <TextField
          className="input__create__user"
          label="Password repeat"
          type="password"
          margin="normal"
          inputRef={element => setPasswordRepeat(element)}
          variant="outlined"
        />
        
        <Button variant="contained" color="primary" onClick={handleClick}>
          Create
        </Button>
      </div>
    </div>
  )
}

export default NewUsr
