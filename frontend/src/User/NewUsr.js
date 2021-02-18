import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import './NewUsr.css';
import { register } from "../services/auth.service"
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';


function NewUsr() {
  const [message, setMessage] = useState("");
  const [timerId, setTimerId] = useState();

  const [username, setUsername] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [passwordRepeat, setPasswordRepeat] = useState(false);
  const history = useHistory();

  function removeMessage() {
    setMessage("")
  }

  const PasswordCheckResult = {
    GENERAL_ERROR : 0,
    APPROVED : 1,
    LENGTH_TOO_SHORT : 2,
    MISSING_UPPERCASE : 3,
    MISSING_LOWERCASE : 4,
    MISSING_SPECIAL_CHAR : 5,
    MISSING_NUMBER : 6,
    PASSWORDS_DO_NOT_MATCH : 7
  }

  function CheckPasswords(password, passwordRepeat)
  {
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    var specialCharacters = /[!@#\$%\^\&*\)\(+=._-]/g;
    var minLength = 8;
    if(password.value !== passwordRepeat.value) return PasswordCheckResult.PASSWORDS_DO_NOT_MATCH;
    if(password.value.length < minLength) return PasswordCheckResult.LENGTH_TOO_SHORT;
    if(!password.value.match(lowerCaseLetters)) return PasswordCheckResult.MISSING_LOWERCASE;
    if(!password.value.match(upperCaseLetters)) return PasswordCheckResult.MISSING_UPPERCASE;
    if(!password.value.match(specialCharacters)) return PasswordCheckResult.MISSING_SPECIAL_CHAR;
    if(!password.value.match(numbers)) return PasswordCheckResult.MISSING_NUMBER;
    return PasswordCheckResult.APPROVED;
  }

  const handleClick = () => {
    removeMessage()
    clearTimeout(timerId)

    var passwordCheckResult = CheckPasswords(password, passwordRepeat)
    if (passwordCheckResult === PasswordCheckResult.APPROVED) {
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
          setTimerId(setTimeout(removeMessage, 10000));
        }
      )
    } else {
      switch(passwordCheckResult)
      {
        case PasswordCheckResult.PASSWORDS_DO_NOT_MATCH: 
        setMessage('The given passwords do not match.');
        break;
        case PasswordCheckResult.LENGTH_TOO_SHORT: 
        setMessage('The password is too short.');
        break;
        case PasswordCheckResult.MISSING_LOWERCASE: 
        setMessage('The password should contain at least one lowercase letter.');
        break;
        case PasswordCheckResult.MISSING_UPPERCASE: 
        setMessage('The password should contain at least one uppercase letter.');
        break;
        case PasswordCheckResult.MISSING_NUMBER: 
        setMessage('The password should contain at least one number.');
        break;
        case PasswordCheckResult.MISSING_SPECIAL_CHAR: 
        setMessage('The password should contain at least one special character.');
        break;
        default: 
        setMessage('An Error occured. Please try again later.');
        break;
      }
      //setMessage('The passwords do not match.');
      setTimerId(setTimeout(removeMessage, 10000));
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
