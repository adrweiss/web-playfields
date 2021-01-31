import React, { useState, useEffect } from 'react'
import './Home.css'
import Message from './Message'
import Welcome from './Welcome'
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';

import { getCurrentUser } from "../services/auth.service"
import HomeService from "../services/home.service.js"

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

function Home() {
  const [amountPosts, setAmountPosts] = useState([]);
  const [messageFlow, setMessageFlow] = useState([]);
  const [descriptionText, setDescriptionText] = useState([]);
  const [message, setMessage] = useState("");
  const [timerId, setTimerId] = useState();
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");

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

    HomeService.getDescriptions().then((response) => {
      setDescriptionText(response.data)
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

    if (currentUser !== null && currentUser.expire >= Math.floor(new Date().getTime() / 1000)) {
      HomeService.addPostUser(title, post).then((response) => {
        fetchPosts(0)
        setTitle('')
        setPost('')
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
        setTitle('')
        setPost('')
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

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleChangePost = (event) => {
    setPost(event.target.value);
  };

  return (
    <div>
      <h1>Welcome to playfield</h1>
      <Grid container spacing={3}>
        <Grid item sm={6}>
          <div className='posts'>

            {message && (
              <div className="response">
                {message}
              </div>
            )}

            <div className="write__posts">
              <TextField
                className='input__post'
                label="Title"
                variant="outlined"
                margin="normal"
                value={title}
                onChange={handleChangeTitle}
              />

              <TextField
                className='input__post'
                label="Post"
                multiline
                variant="outlined"
                margin="normal"
                value={post}
                onChange={handleChangePost}
              />

              <Button
                variant="contained"
                color="primary"
                onClick={sendPost}
              >
                Send
              </Button>
            </div>

            <div className="test">
              {messageFlow?.length === 0 ? (
                <div className='write__posts'>
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
        </Grid>
        <Grid item sm={6}>
          <div>
            {descriptionText?.map(item => (
              <Welcome
                key={item.id}
                id={item.id}
                title={item.title}
                body={item.body}
              />
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Home