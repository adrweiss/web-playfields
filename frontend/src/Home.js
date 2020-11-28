import React from 'react'
import './Home.css'
import Message from './Message'
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';


function Home() {
  const messageFlow = [
    {
      "id": "1234", 
      "title": "A-title",
      "post":"first message ",
      "usr":"A",
      "timestamp":"28. November"
      },
      {
      "id": "5678", 
      "title": "B-title",
      "post":"second message ",
      "usr":"B",
      "timestamp":"29. November"
      },
      {
      "id": "91011", 
      "title": "C-title",
      "post":"third message ",
      "usr":"C",
      "timestamp":"30. November"
      }
  ]

  

  const numberPages = 15
  
  const handleChangePage = (event, newPage) => {
    console.log(newPage)    
  }


  return (
    <div> 
        <div className='homescreen'>
          <h1>The start screen will be placed here/ It will be possible to add posts here.</h1>
        </div>
        <div className="homescreen">                 
                <textarea className="input__write__post"  id="text" name="text" cols="35" rows="4" maxlength="100">Write a new Post</textarea> 	
                <input type="submit" value="Send" />  
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
                id={item.id}
                title={item.title}
                post={item.post}
                usr={item.usr}
                timestamp={item.timestamp}
                />
              ))}      
            </div>
          )}
        </div>
      
        <Grid container justify = "center">
          <Pagination className="page__number" count={numberPages} variant="outlined" shape="rounded" onChange={handleChangePage}/>
        </Grid>
        
    </div>
  )
}

export default Home