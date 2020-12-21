import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
import { login } from "./services/auth.service"


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
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();

  const handleClick = () => {
    var identifier = document.getElementById('identifier').value
    var password = document.getElementById('password').value

    login(identifier, password).then(
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
        <label>Email or Username</label>
        <input type="text" id="identifier" name="identifier" />
        <label>Password:</label>
        <input type="password" id="password" name="password" minLength="8" required />
        <Button variant="contained" color="primary" disableElevation onClick={handleClick}>
          Sign in
        </Button>

        <Link className='Link' to="/user/register">
          <Button className="create__new__user__link" variant="contained" color="primary" disableElevation>
            Create new User
          </Button>
        </Link>

        <Button variant="contained" color="primary" disableElevation onClick={openModal}>
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
            <label >E-mail:</label>
            <input type="text" id="email" name="email" />
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
