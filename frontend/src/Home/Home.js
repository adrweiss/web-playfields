import React, { useState, useEffect } from 'react'
import './Home.css'
import Message from './Message'
import Welcome from './Welcome'
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';

import { getCurrentUser, getTempDescription } from "../services/auth.service"
import HomeService from "../services/home.service.js"

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

function Home() {
  const [amountPosts, setAmountPosts] = useState([]);
  const [messageFlow, setMessageFlow] = useState([]);
  const [descriptionText, setDescriptionText] = useState([]);
  const [message, setMessage] = useState("");
  const [messageDesc, setMessageDesc] = useState("");
  const [timerId, setTimerId] = useState();
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [idCounter, setIdCounter] = useState(0);

  const currentUser = getCurrentUser();
  const postPSide = 5


  function removeMessage() {
    setMessage("")
    setMessageDesc("")
  };

  useEffect(() => {
    const currentUser = getCurrentUser();

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
    if (currentUser?.rights.includes('EDIT_DISCRIPTION_HOME') || currentUser?.rights.includes('ADMIN')) {
      HomeService.getAllDescriptions().then((response) => {
        let description = response.data

        var i
        for (i = 0; i < description.length; i++) {
          description[i].serial_number = (i + 1)
        }

        setDescriptionText(description);
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
    } else {
      HomeService.getDescriptions().then((response) => {
        setDescriptionText(response.data);
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
    }
  }, []);

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
  };

  const handleChangePage = (event, newPage) => {
    fetchPosts(((newPage - 1) * 5))
  };

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
  };

  function getDesc() {
    HomeService.getAllDescriptions().then((response) => {
      setDescriptionText(response.data);
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
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangePost = (event) => {
    setPost(event.target.value);
  };

  const deleteDescription = (descId, posNum) => {
    removeMessage()
    clearTimeout(timerId)
    
    let tempDesc = getTempDescription()
    let searchEnt

    if (tempDesc !== null) {
      searchEnt = tempDesc.find(element => element.newId === descId)
      if (searchEnt && searchEnt.regId !== null) {
        descId = searchEnt.regId
      }
    }

    let toRemove = descriptionText
    if (Number.isInteger(descId)) {
      toRemove.splice(posNum, 1);

      var i
      for (i = 0; i < toRemove.length; i++) {
        toRemove[i].serial_number = (i + 1)
      }
      let sorted = [...toRemove].sort((a, b) => {
        return a.serial_number - b.serial_number;
      });

      setDescriptionText(sorted)
      setMessageDesc("Description was deleted.");
      setTimerId(setTimeout(removeMessage, 10000));

      return
    }
    HomeService.deleteDescription(descId).then((response) => {
      setMessageDesc(response.data.message);
      setTimerId(setTimeout(removeMessage, 10000));
      getDesc();
    },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessageDesc(_content);
        setTimerId(setTimeout(removeMessage, 10000));
      })
  };

  const addNewDescription = (posNum) => {
    let newDescription = {
      "_id": idCounter,
      "visible": false,
      "title": "",
      "serial_number": posNum + 1,
      "body": "",
      "newItem": true
    }

    let tempDesc = []
    if (getTempDescription() !== null) {
      tempDesc = [...getTempDescription(), { "newId": idCounter, "regId": null }]
      localStorage.setItem("newDesc", JSON.stringify(tempDesc));
    } else {
      localStorage.setItem("newDesc", JSON.stringify([{ "newId": idCounter, "regId": null }]));
    }

    setIdCounter(idCounter + 1)

    let combined = descriptionText
    var i;
    for (i = 0; i < combined.length; i++) {
      combined[i].serial_number = (i + 1)
    }
    for (i = posNum; i < combined.length; i++) {
      combined[i].serial_number = (combined[i].serial_number + 1)
    }

    combined = [...descriptionText, newDescription]
    let sorted = [...combined].sort((a, b) => {
      return a.serial_number - b.serial_number;
    });

    setDescriptionText(sorted)
  };

  const moveUp = (posNum) => {
    let combined = descriptionText

    combined[posNum - 1].serial_number = posNum + 1
    combined[posNum].serial_number = posNum

    let sorted = [...combined].sort((a, b) => {
      return a.serial_number - b.serial_number;
    });

    let tempDesc = getTempDescription()
    let descIdOne = combined[posNum]._id
    let descIdTwo = combined[posNum - 1]._id
    let searchEnt

    if (tempDesc !== null) {
      searchEnt = tempDesc.find(element => element.newId === descIdOne)
      if (searchEnt && searchEnt.regId !== null) {
        descIdOne = searchEnt.regId
      }
    }

    if (tempDesc !== null) {
      searchEnt = tempDesc.find(element => element.newId === descIdTwo)
      if (searchEnt && searchEnt.regId !== null) {
        descIdTwo = searchEnt.regId
      }
    }

    if (Number.isInteger(descIdOne) || Number.isInteger(descIdTwo)) { return setDescriptionText(sorted) }

    HomeService.setPosition(descIdOne, descIdTwo).then((response) => {
      console.log(response.data.message);
      setDescriptionText(sorted)
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
  }

  const moveDown = (posNum) => {
    let combined = descriptionText

    combined[posNum + 1].serial_number = posNum + 1
    combined[posNum].serial_number = posNum + 2

    let sorted = [...combined].sort((a, b) => {
      return a.serial_number - b.serial_number;
    });

    let tempDesc = getTempDescription()
    let descIdOne = combined[posNum]._id
    let descIdTwo = combined[posNum + 1]._id
    let searchEnt

    if (tempDesc !== null) {
      searchEnt = tempDesc.find(element => element.newId === descIdOne)
      if (searchEnt && searchEnt.regId !== null) {
        descIdOne = searchEnt.regId
      }
    }

    if (tempDesc !== null) {
      searchEnt = tempDesc.find(element => element.newId === descIdTwo)
      if (searchEnt && searchEnt.regId !== null) {
        descIdTwo = searchEnt.regId
      }
    }

    if (Number.isInteger(descIdOne) || Number.isInteger(descIdTwo)) { return setDescriptionText(sorted) }

    HomeService.setPosition(descIdTwo, descIdOne).then((response) => {
      console.log(response.data.message);
      setDescriptionText(sorted)
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
  }

  return (
    <div>
      <h1>Welcome to&nbsp;<i>Playfields</i></h1>
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

            <div>
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
                      reported={item.reported}
                      solved={item.solved}
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
            {messageDesc && (
              <div className="response">
                {messageDesc}
              </div>
            )}

            <div hidden={!(currentUser?.rights.includes('EDIT_DISCRIPTION_HOME') || currentUser?.rights.includes('ADMIN'))}>
              <div className="description__add__new">
                <IconButton onClick={(event) => addNewDescription(0)}>
                  <Tooltip title="Add new Discription" aria-label="move__down">
                    <AddIcon fontSize='small' />
                  </Tooltip>
                </IconButton>
              </div>
            </div>

            {descriptionText?.map((item, i) => (
              <div key={item._id}>
                <div className="home__description__container">
                  <div className="home__move__button">
                    <div hidden={!(currentUser?.rights.includes('EDIT_DISCRIPTION_HOME') || currentUser?.rights.includes('ADMIN'))}>
                      <div>
                        <IconButton onClick={(event) => deleteDescription(item._id, i)}>
                          <Tooltip title="Delete Description">
                            <DeleteIcon fontSize='small' />
                          </Tooltip>
                        </IconButton>
                      </div>
                      {i > 0 && (
                        <div >
                          <IconButton onClick={(event) => moveUp(i)}>
                            <Tooltip title="Move up" aria-label="move__up">
                              <ExpandLessIcon fontSize='small' />
                            </Tooltip>
                          </IconButton>
                        </div>
                      )}
                      {i < descriptionText?.length - 1 && (
                        <div>
                          <IconButton onClick={(event) => moveDown(i)}>
                            <Tooltip title="Move down" aria-label="move__down">
                              <ExpandMoreIcon fontSize='small' />
                            </Tooltip>
                          </IconButton>
                        </div>
                      )}
                    </div>
                  </div>
                  <Welcome
                    id={item._id}
                    visible={item.visible}
                    title={item.title}
                    body={item.body}
                    serial_number={item.serial_number}
                    newItem={item.newItem}
                  />
                </div>
                <div hidden={!(currentUser?.rights.includes('EDIT_DISCRIPTION_HOME') || currentUser?.rights.includes('ADMIN'))}>
                  <div className="description__add__new">
                    <IconButton onClick={(event) => addNewDescription(item.serial_number)}>
                      <Tooltip title="Add new Discription" aria-label="move__down">
                        <AddIcon fontSize='small' />
                      </Tooltip>
                    </IconButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    </div >
  )
}

export default Home