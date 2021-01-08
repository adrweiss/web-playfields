import React, { useState, useEffect } from 'react'
import './Home.css'
import Message from './Message'
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';

import { getCurrentUser } from "../services/auth.service"
import HomeService from "../services/home.service.js"


function Home() {
  const [amountPosts, setAmountPosts] = useState([]);
  const [messageFlow, setMessageFlow] = useState([]);
  const [message, setMessage] = useState("");
  const [timerId, setTimerId] = useState();

  const currentUser = getCurrentUser();
  const postPSide = 5

  function removeMessage() {
    setMessage("")
  }

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

  function fetchPosts(skip) {
    removeMessage()
    HomeService.getPosts(skip, postPSide).then((response) => {
      setMessageFlow(response.data)
    },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(_content);
      })
  }

  const handleChangePage = (event, newPage) => {
    fetchPosts(((newPage - 1) * 5))
  }

  const sendPost = () => {
    removeMessage()
    clearTimeout(timerId)

    var title = document.getElementById('title_text').value
    var post = document.getElementById('post_text').value

    if (currentUser !== null && currentUser.expire >= Math.floor(new Date().getTime() / 1000)) {
      HomeService.addPostUser(title, post).then((response) => {
        fetchPosts(0)
      },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(_content);
          setTimerId(setTimeout(removeMessage, 10000));
        })
    } else {
      HomeService.addPostAny(title, post).then((response) => {
        fetchPosts(0)
      },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(_content);
          setTimerId(setTimeout(removeMessage, 10000));
        })
    }
  }

  return (
    <div>
      <h1>The start screen will be placed here/ It will be possible to add posts here.</h1>

      {message && (
        <div className="response">
          {message}
        </div>
      )}

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
                  userId={item.userid}
                  usr={item.username}
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