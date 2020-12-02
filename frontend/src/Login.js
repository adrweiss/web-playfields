import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
  }
};

Modal.setAppElement('body')

function Login() {
  const [modalIsOpen,setIsOpen] = React.useState(false);
  
  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  return (
    <div className='container__login'>
      <h1>Please login</h1>       
      
      <div className='login'>
        <label>Username:</label>
        <input type="text" id="username" name="username"/>
        <label>Password:</label>
        <input type="password" id="pass" name="password" minLength="8" required/>
        <Button variant="contained" color="primary" disableElevation>
          Sign in 
        </Button>

        <Link to="/user/newusr">
          <Button className="create__new__user__link" variant="contained" color="primary" disableElevation>
            Create new User
          </Button>
        </Link> 
        
        <Button  variant="contained" color="primary" disableElevation onClick={openModal}>
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
            <label >Username:</label>
            <input type="text" id="username" name="username"/>
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
