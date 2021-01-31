import React, { useState } from 'react'
import './Footer.css'

import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';

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
  

  const handlerModalContactForm = () => {
    setModalContactForm(!modalContactForm)
  }

  const handlerModalReportBug = () => {
    setModalReportButton(!modalReportButton)
  }

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
        <div>
          <h3>Contact Form</h3>
          <p>Not in place</p>
        </div>
      </Modal>

      <Modal
        isOpen={modalReportButton}
        onRequestClose={handlerModalReportBug}
        style={customStyles}
        contentLabel="Report_Bug"
      >
        <div>
          <h3>Report Bug</h3>
          <p>Not in place</p>
        </div>
      </Modal>
    </div>
  )
}

export default Footer
