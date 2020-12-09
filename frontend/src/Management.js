import React from 'react'
import './Management.css'
import Grid from '@material-ui/core/Grid';


function Management() {
  return (
    <div>
      <h1>The side for the admin to controll access.</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <li>Search for User</li>
          <li>Email, Nickname, Createion Date</li>
          <li>List with all users</li>
          <li>Delete User</li>
          <li>Test for Roles Mgt / Login-Log</li>
        </Grid>
        <Grid item xs={12} sm={6}>
          <li>Add Rights</li>
          <li>Shw role of the user, and show the rights</li>
          <li>Show specific right to a selected user</li>
          <li>Remove Rights</li>
        </Grid>
      </Grid>
    </div>
  )
}

export default Management