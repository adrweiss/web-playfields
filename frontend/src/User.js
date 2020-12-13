import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import './User.css'
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';




import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';


import { getCurrentUser } from "./services/auth.service";


function User() {
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

  const currentUser = getCurrentUser();

  console.log(currentUser.username)
  const currentNickname = 'TestName'
  const [role, setRole] = useState(roles[0]);
  const [size, setSize] = useState(8);
  const [hideRoleInfo, setHideRoleInfo] = useState(true);


  //useEffect(() => { setHideRoleInfo(false) }, [])

  const handleCellClick = (event, role_id) => {
    if (role_id === role.role_id) {
      setHideRoleInfo(!hideRoleInfo)
      if (hideRoleInfo) {
        setSize(4)
      } else {
        setSize(8)
      }
    } else {
      if (hideRoleInfo) {
        setHideRoleInfo(false)
        setSize(4)
      }
    }

    setRole(roles.find(role => role.role_id === role_id))
  }


  return (
    <div>
      <h1>User Self Service</h1>
      <Grid container spacing={3}>
        <Grid item sm={4}>
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
        <Grid item sm={size}>
          <div className='table__container'>
            <h2>List of assigned roles</h2>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Roles</TableCell>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="left">Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roles?.map((role) => (
                    <TableRow
                      hover
                      key={role.role_id}
                      onClick={(event) => handleCellClick(event, role.role_id)}
                    >
                      <TableCell align="left">{role.role_name}</TableCell>
                      <TableCell align="left">{role.assignment_date}</TableCell>
                      <TableCell align="left">{role.role_description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
        <Grid item sm={4}>
          <div className='table__container' hidden={hideRoleInfo}>
            <h2>List of assigned rights for "{role?.role_name}"</h2>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Rights</TableCell>
                    <TableCell align="left">Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {role.rights?.map((right) => (
                    <TableRow key={right.right_id}>
                      <TableCell align="left">{right.right_name}</TableCell>
                      <TableCell align="left">{right.right_description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default User
