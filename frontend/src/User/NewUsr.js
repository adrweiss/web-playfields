// React
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// CSS
import "./NewUsr.css";
// Material UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// Self written
import { register } from "../services/auth.service";
import CheckPasswords from "../helpers/CheckPasswords";
import validyChecks from "../helpers/validyChecks";

function NewUsr() {
  const [message, setMessage] = useState("");
  const [timerId, setTimerId] = useState();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const history = useHistory();

  function removeMessage() {
    setMessage("");
  }

  const handleClick = () => {
    removeMessage();
    clearTimeout(timerId);

    register(username, email, password).then(
      (response) => {
        console.log(response.data.message);
        //setMessage(response.data.message);
        history.push("/login");
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
    );
    setTimerId(setTimeout(removeMessage, 10000));
  };

  // Handles
  const handleSetUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleSetEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleSetPassword = (event) => {
    setPassword(event.target.value);
  };
  const handleSetPasswordRepeat = (event) => {
    setPasswordRepeat(event.target.value);
  };

  return (
    <div className="create__container">
      <h1>Create New User</h1>

      <div className="create__new__user">
        {message && <div className="response">{message}</div>}
        <TextField
          className="input__create__user"
          label="Username"
          variant="outlined"
          margin="normal"
          value={username}
          onChange={handleSetUsername}
        />

        <TextField
          className="input__create__user"
          label="E-Mail"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={handleSetEmail}
        />

        {password && (
          <CheckPasswords password={password} passwordRepeat={passwordRepeat} />
        )}

        <TextField
          className="input__create__user"
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={handleSetPassword}
        />

        <TextField
          className="input__create__user"
          label="Repeat Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={passwordRepeat}
          onChange={handleSetPasswordRepeat}
        />

        <Button
          variant="contained"
          color="primary"
          disabled={
            !(
              validyChecks.checkPasswordLength(password) &&
              validyChecks.checkPasswordEqual(password, passwordRepeat) &&
              validyChecks.checkPasswordLowercase(password) &&
              validyChecks.checkPasswordUppercase(password) &&
              validyChecks.checkPasswordNumber(password)
            )
          }
          onClick={handleClick}
        >
          Create
        </Button>
      </div>
    </div>
  );
}

export default NewUsr;
