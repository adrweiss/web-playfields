import React from 'react'
import './Welcome.css'


function Welcome({id, title, body}) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  )
}



export default Welcome
