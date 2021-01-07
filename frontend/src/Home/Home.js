import React, { useState, useEffect } from 'react'
import './Home.css'
import Message from './Message'
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import axios from '../config/axios';

import HomeService from "../services/home.service.js"


function Home() {
  const [amountPosts, setAmountPosts] = useState([]);
  const [messageFlow, setMessageFlow] = useState([]);

  const postPSide = 5

  useEffect(() => {
    HomeService.getAmount().then((response) => {
      setAmountPosts(Math.ceil(response.data.amount / postPSide));
    },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(_content);
      })

    HomeService.getPosts(0, postPSide).then((response) => {
      setMessageFlow(response.data)
    },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(_content);
      })


  }, [])

  /*
  async function fetchPosts(pageNo) {
    //const req = await axios.get('/getPage', {params: {"pageNo": pageNo.toString(), "size": postPSide.toString()}});
    //setMessageFlow(req.data)
    await axios.get('/getPage', { params: { "pageNo": pageNo.toString(), "size": postPSide.toString() } })
      .then(response => {
        setMessageFlow(response.data)
      })
      .catch(error => {
        console.log('Endpoint not available.')
      });
  }
  

  async function fetchCountPosts() {
    //const req = await axios.get('/countPosts');
    //setAmountPosts(Math.ceil(req.data.count / postPSide));
    await axios.get('/countPosts')
      .then(response => {
        setAmountPosts(Math.ceil(response.data.count / postPSide));
      })
      .catch(error => {
        console.log('Endpoint not available.')
      })
  }
  */

  const handleChangePage = (event, newPage) => {
    //fetchPosts(newPage)
  }

  const sendPost = () => {
    var title_text = document.getElementById('title_text').value
    var post_text = document.getElementById('post_text').value


    axios.post('/addPost', {
      'title': title_text,
      'content': post_text,
      'ID_USR': 2
    })
      .then((response) => {
        //fetchCountPosts()
        //fetchPosts('1')
      }, (error) => {
        console.log('Endpoint not available.')
      });
  }

  return (
    <div>
      <h1>The start screen will be placed here/ It will be possible to add posts here.</h1>

      <div className="homescreen_title">
        <textarea className="input__write__post" id="title_text" name="title_text" cols="35" rows="1" maxLength="35" placeholder="Write a Title" />
      </div>

      <div className="homescreen">
        <textarea className="input__write__post" id="post_text" name="text" cols="35" rows="4" maxLength="140" placeholder="Write a new Post" />
        <input type="submit" value="Send" onClick={sendPost} />
      </div>

      <div>
        {messageFlow?.length === 0 ? (
          <div className='homescreen'>
            <h2>No post available</h2>
          </div>
        ) : (
            <div>
              {messageFlow?.map(item => (
                <Message
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  post={item.body}
                  usr={item.userid}
                  timestamp={item.date}
                />
              ))}
            </div>
          )}
      </div>

      {amountPosts > 0 ? (
        <Grid container justify="center">
          <Pagination className="page__number" count={amountPosts} variant="outlined" shape="rounded" onChange={handleChangePage} />
        </Grid>
      ) : (
          <Grid container justify="center">
            <Pagination className="page__number" count={0} variant="outlined" shape="rounded" onChange={handleChangePage} />
          </Grid>
        )}
    </div>
  )
}

export default Home