import React, { useState, useEffect } from 'react'
import './Home.css'
import Message from './Message'
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import axios from './axios';



function Home() {
  const [amountPosts, setAmountPosts] = useState([]);
  const [messageFlow, setMessageFlow] = useState([]);

  const postPSide = 5

  useEffect(() => {
    async function fetchPosts() {
      const req = await axios.get('/getPage', {params: {"pageNo": '1', "size": postPSide.toString()}});
      setMessageFlow(req.data)
    }
    fetchPosts();
  }, [])

  useEffect(() => {
    async function fetchCountPosts() {
      const req = await axios.get('/countPosts');
      setAmountPosts(Math.ceil(req.data.count / postPSide));
    }
  
    fetchCountPosts();
  }, [])

  async function fetchPosts(pageNo) {
    const req = await axios.get('/getPage', {params: {"pageNo": pageNo.toString(), "size": postPSide.toString()}});
    setMessageFlow(req.data)
  }

  async function fetchCountPosts() {
    const req = await axios.get('/countPosts');
    setAmountPosts(Math.ceil(req.data.count / postPSide));
  }
  
  const handleChangePage = (event, newPage) => {
    fetchPosts(newPage)
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
      fetchCountPosts()
      fetchPosts('1')
      //console.log(response)
    }, (error) => {
      //console.log(error)
    });
    
  }


  return (
    <div> 
        <h1>The start screen will be placed here/ It will be possible to add posts here.</h1>
        <div className="homescreen_title">
          <textarea className="input__write__post"  id="title_text" name="title_text" cols="35" rows="1" maxlength="35">Write a Title</textarea> 	                 
        </div>
        <div className="homescreen">
          <textarea className="input__write__post"  id="post_text" name="text" cols="35" rows="4" maxlength="140">Write a new Post</textarea> 	
          <input type="submit" value="Send" onClick={sendPost}/>  
        </div>
        <div>
          {messageFlow?.length === 0 ? (
            <div className='homescreen'>
              <h2>No post available</h2> 
            </div>
          ):(
            <div>    
              {messageFlow?.map(item=> (
                <Message
                id={item._id}
                title={item.title}
                post={item.content}
                usr={item.ID_USR}
                timestamp={item.creationDate}
                />
              ))}      
            </div>
          )}
        </div>
      
        <Grid container justify = "center">
          <Pagination className="page__number" count={amountPosts} variant="outlined" shape="rounded" onChange={handleChangePage}/>
        </Grid>
          
    </div>
  )
}

export default Home
