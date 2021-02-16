import React from 'react'
import './Home.Reported.Management.css'

function HomeReportedManagement({id, username, body, title, solved, blocked, changed, date}) {
  return (
    <div className="reported__posts__container">
      <h3>{title}</h3>
      <div>
        {body}
      </div>
      <div>
        edit delete, block, solved 
      </div>
      <div>
        username, changed, date
      </div>
    </div>
  )
}

export default HomeReportedManagement
