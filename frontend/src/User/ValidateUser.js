import React, { useState } from 'react'
import './ValidateUser.css'

import Button from '@material-ui/core/Button';
import queryString from 'query-string';

import { validate, logout } from "../services/auth.service"
import { useHistory } from 'react-router-dom';


function ValidateUser() {
  const [message, setMessage] = useState("");
  const history = useHistory();
  var urlParam = queryString.parse(window.location.search)
  logout()

  const handleValidate = () => {
    validate(urlParam.userid, urlParam.vk).then(() => {
      console.log('successfull validated')
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
    );
  }

  return (
    <div className='validate'>
      <h1>Validate your account</h1>

      {message && (
        <div className="response">
          {message}
        </div>
      )}

      <div className='validate__text'>
        Please press the button to validate your mail address.
      </div>

      <Button variant="contained" color="primary" onClick={handleValidate}>
        Validate
      </Button>
    </div>
  )
}

export default ValidateUser
