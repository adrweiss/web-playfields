import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import './NewUsr.css';
import axios from './axios';
import Banner from 'react-js-banner';

function NewUsr() {
  const [response, setResponse] = useState([]);


  const handleClick = () => {
    //setResponse = []
    //handlerRemoveItem('The passwords does mot match!')
    //handlerRemoveItem('The user was successfull created!')
    //handlerRemoveItem('It occured a unknown error!')
    console.log(response)
    if (response.length !== 0){
      //setResponse(response.filter(item => item.name ===''))
      console.log('hier')
      console.log(response.length)
      console.log(response)
    }
    
    var username = document.getElementById('username').value
    var password_1 = document.getElementById('pass').value
    var password_2 = document.getElementById('pass_again').value
    

    if (password_1 === password_2) {
      
      axios.post('/users', {
          'email': username,
          'pword': password_1
        })
        .then((response) => {
          setResponse(0)
        }, (error) => {
          console.log(error)
          setResponse(1)
        });
    } else {
      setResponse(2)
    }
  }

  return (
    <div className='container'>   
      <div className='create__container'>        
        <h1>Create New User</h1>
        
        {response === 2 ? (
          <Banner 
            css={{color: "#FFF", backgroundColor: "red", borderRadius: '8px', fontFamily: 'Fira Sans', fontSize: 18}}
            title='The passwords does mot match!'
            //visibleTime='5'
            showBanner='true'
          />
          
        ) : response === 0 ? (
          <Banner 
            css={{color: "#FFF", backgroundColor: "green", borderRadius: '8px', fontFamily: 'Fira Sans', fontSize: 18}}
            title='The user was successfull created!' 
            //visibleTime='5'
            showBanner='true'
          />
        ) : response === 1 ? (
          <Banner 
            css={{color: "#FFF", backgroundColor: "red", borderRadius: '8px', fontFamily: 'Fira Sans', fontSize: 18}}
            title='It occured a unknown error!' 
            //visibleTime='5'
            showBanner='true'
          />
        ) : (
          <Banner 
            showBanner='false'        
          />
        )}       

        <div>
            <label className='create__input__label'>E-Mail:</label>
            <input className='create__input__field' type="text" id="username" name="username"/>
        </div>

        <div>
          <label className='create__input__label'>Password:</label>
          <input className='create__input__field' type="password" id="pass" name="password"
            minlength="8" required/>
        </div>

        <div>
          <label className='create__input__label'>Password again:</label>
          <input className='create__input__field' type="password" id="pass_again" name="password"
            minlength="8" required/>
        </div>
        
        <Button className='create__button' variant="contained" color="primary" onClick={handleClick}>
          Create
        </Button>
      </div>
    </div>
  )
}

export default NewUsr
