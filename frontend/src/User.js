import React from 'react'
import Button from '@material-ui/core/Button';
import './User.css'
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';

//import RolesRightsRow from './RolesRightsRow'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
//import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';


function User() {
  const currentNickname = 'TestName'

  const roles = [
    {
      "role_id": "234",
      "role_name": "1 Role",
      "role_description": "thats a text which descrips the role",
      "assignment_date": "01-01-1900",
      "rights": [
        {
          "right_id": "1234",
          "right_name": "right 1",
          "right_description": "thats a text which descrips the right"
        },
        {
          "right_id": "2345",
          "right_name": "right 2",
          "right_description": "thats a text which descrips the right"
        }
      ]
    },
    {
      "role_id": "123",
      "role_name": "2 Role",
      "role_description": "thats a text which descrips the role",
      "assignment_date": "01-02-1900",
      "rights": [
        {
          "right_id": "3456",
          "right_name": "right 3",
          "right_description": "thats a text which descrips the right"
        },
        {
          "right_id": "4567",
          "right_name": "right 4",
          "right_description": "thats a text which descrips the right"
        }
      ]
    }
  ]

  const handleCellClick = (event, name) => {
    console.log(name)
  }

  return (
    <div>
      <h1>User Self Service</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <div className="container__user">
            <h2>Change your user settings</h2>

            <p>Here you can change your nickname. Your current nickname is {currentNickname}. It is not necessary that your user is unique.</p>

            <div className="change__nickname">
              <label>New nickname</label>
              <input type="text" id="username" name="username" />
              <Button variant="contained" color="primary" disableElevation>
                Accept
              </Button>
            </div>

            <p>Here you can change your current password.</p>

            <div className='change__password__section'>
              <label>Old password:</label>
              <input type="password" id="old_pass" name="password" minLength="8" required />
              <label>New Password:</label>
              <input type="password" id="new_pass" name="password" minLength="8" required />
              <label>New Password again:</label>
              <input type="password" id="new_again_pass" name="password" minLength="8" required />
              <Button variant="contained" color="primary" disableElevation>
                Accept new password
              </Button>
            </div>

            <div className='delete__profile'>
              <Button variant="contained" color="secondary" startIcon={<DeleteIcon />}>
                Delete Profile
              </Button>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <h2>List of your roles and rights</h2>
          <TableContainer >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell align="left">Assigned system roles</TableCell>
                  <TableCell align="left">Assignemnt date</TableCell>
                  <TableCell align="left">Role description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roles?.map((role) => (
                  <TableRow 
                   hover
                    key={role.role_id}
                    onClick={(event) => handleCellClick(event, role.role_id)}
                  >
                    <TableCell component="th" scope="row">{role.role_name}</TableCell>
                    <TableCell align="right">{role.assignment_date}</TableCell>
                    <TableCell align="right">{role.role_description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  )
}

export default User
