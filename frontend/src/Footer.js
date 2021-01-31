import React, { useState } from 'react'
import './Footer.css'

import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

Modal.setAppElement('body')

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overlay: { zIndex: 9999 }
  }
};

function Footer() {
  const [modalContactForm, setModalContactForm] = useState(false);
  const [modalReportButton, setModalReportButton] = useState(false);
  const [modalContactMail, setModalContactMail] = useState("");
  const [modalContactReason, setModalContactReason] = useState("");
  const [modalContactDescription, setModalContactDescription] = useState("");
  const [modalBugReason, setModalBugReason] = useState("");
  const [modalBugDescription, setModalBugDescription] = useState("");


  const handlerModalContactForm = () => {
    setModalContactForm(!modalContactForm)
  }

  const handlerModalReportBug = () => {
    setModalReportButton(!modalReportButton)
  }

  const handlerSendBug = () => {
    console.log(modalBugReason)
    console.log(modalBugDescription)
    setModalReportButton(!modalReportButton)
  }

  const handlerSendContact = () => {
    console.log(modalContactMail)
    console.log(modalContactReason)
    console.log(modalContactDescription)
    setModalContactForm(!modalContactForm)
  }
 
  const handleContactMail = (event) => {
    setModalContactMail(event.target.value);
  };
  const handleContactReason = (event) => {
    setModalContactReason(event.target.value);
  };
  const handleContactDescription = (event) => {
    setModalContactDescription(event.target.value);
  };
  const handleBugReason = (event) => {
    setModalBugReason(event.target.value);
  };
  const handleBugDescription = (event) => {
    setModalBugDescription(event.target.value);
  };

  return (
    <div className='footer'>
      <Button style={{ textTransform: 'none' }} className='footer__entity' onClick={handlerModalContactForm}>
        <div className='footer__entity'>
          Contact Form
        </div>
      </Button>

      <Button style={{ textTransform: 'none' }} className='footer__entity' onClick={handlerModalReportBug}>
        <div className='footer__entity'>
          Report Bug
        </div>
      </Button>

      <div>
        <Link to="/impressum" className='footer__entity'>
          {'Impressum'}
        </Link>
      </div>

      <Modal
        isOpen={modalContactForm}
        onRequestClose={handlerModalContactForm}
        style={customStyles}
        contentLabel="Contact_Form"
      >
        <div className='modal__footer'>
          <h3>Contact Form</h3>

          <TextField
            className='modal__footer__textfield'
            label="Email (ptional)"
            variant="outlined"
            margin="normal"
            value={modalContactMail}
            onChange={handleContactMail}
          />

          <TextField
            className='modal__footer__textfield'
            label="Reason"
            variant="outlined"
            margin="normal"
            value={modalContactReason}
            onChange={handleContactReason}
          />

          <TextField
            className='modal__footer__textfield'
            label="Description"
            multiline
            variant="outlined"
            margin="normal"
            value={modalContactDescription}
            onChange={handleContactDescription}
          />

          <Button
            className='modal__footer__send'
            variant="contained"
            color="primary"
            onClick={handlerSendContact}
          >
            Send
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={modalReportButton}
        onRequestClose={handlerModalReportBug}
        style={customStyles}
        contentLabel="Report_Bug"
      >
        <div className='modal__footer'>
          <h3>Report Bug</h3>

          <TextField
            className='modal__footer__textfield'
            label="Resason"
            variant="outlined"
            margin="normal"
            value={modalBugReason}
            onChange={handleBugReason}
          />

          <TextField
            className='modal__footer__textfield'
            label="Description"
            multiline
            variant="outlined"
            margin="normal"
            value={modalBugDescription}
            onChange={handleBugDescription}
          />

          <Button
            className='modal__footer__send'
            variant="contained"
            color="primary"
            onClick={handlerSendBug}
          >
            Send
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default Footer
