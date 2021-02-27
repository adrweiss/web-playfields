import React from 'react'
import './Welcome.css'


function Welcome({id, title, body}) {  
  body = body.replace(/\\n/g, "\n");

  return (
    <div className="welcomme__container">
      <h2>{title}</h2>
      <div>{body}</div>
    </div>
  )
}



export default Welcome
