import React, { useState } from "react";
import "./ForgottPassword.css";
import queryString from "query-string";
import UserService from "../services/user.service";

import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import CheckPasswords from "../helpers/CheckPasswords";
import validyChecks from "../helpers/validyChecks";

function ForgottPassword() {
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  var urlParam = queryString.parse(window.location.search);

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleChangePasswordRepeat = (event) => {
    setPasswordRepeat(event.target.value);
  };

  const handleForgottPassword = () => {
    if (password === passwordRepeat) {
      UserService.setPassword(urlParam.fp, password).then(
        (response) => {
          console.log(response.data.message);
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
        }
      );
    }
  };

  return (
    <div className="reset">
      <h1>Reset your password</h1>
      <div className="reset__password">
        {message && <div className="response">{message}</div>}

        {password && (
          <CheckPasswords password={password} passwordRepeat={passwordRepeat} />
        )}

        <TextField
          className="input__reset__password"
          label="Password"
          type="password"
          margin="normal"
          variant="outlined"
          value={password}
          onChange={handleChangePassword}
        />

        <TextField
          className="input__reset__password"
          label="Password repeat"
          type="password"
          margin="normal"
          variant="outlined"
          value={passwordRepeat}
          onChange={handleChangePasswordRepeat}
        />

        <Button
          className="input__reset__password"
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
          onClick={handleForgottPassword}
        >
          Change password
        </Button>
      </div>
    </div>
  );
}

export default ForgottPassword;
