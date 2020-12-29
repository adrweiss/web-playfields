import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
import { login } from "./services/auth.service"

import TextField from '@material-ui/core/TextField';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
};

Modal.setAppElement('body')

function Login() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState(false);
  const [password, setPassword] = useState(false);
  const history = useHistory();

  const handleClick = () => {
    login(username.value, password.value).then(
      () => {
        console.log('successfull login')
        history.push('/user')
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

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className='container__login'>
      <h1>Please login</h1>

      <div className='login'>
        {message && (
          <div className="response">
            {message}
          </div>
        )}

        <TextField
          className="input__login"
          label="Username or Email "
          inputRef={element => setUsername(element)}
          variant="outlined"
          margin="normal"
        />

        <TextField
          className="input__login"
          label="Password"
          type="password"
          margin="normal"
          inputRef={element => setPassword(element)}
          variant="outlined"
        />

        <Button variant="contained" color="primary" onClick={handleClick}>
          Sign in
        </Button>

        <Link className='Link' to="/user/register">
          <Button className="create__new__user__link" variant="contained" color="primary">
            Create new User
          </Button>
        </Link>

        <Button variant="contained" color="primary" onClick={openModal}>
          Reset Password
        </Button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Reset Password"
      >
        <div className="modal__login">
          <h1>Reset Password</h1>

          <div className='login'>
            <TextField
              className="input__login"
              label="E-mail "
              variant="outlined"
              margin="normal"
            />
            <Button variant="contained" color="primary" disableElevation onClick={closeModal}>
              Send
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Login
