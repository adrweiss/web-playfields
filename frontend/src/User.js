import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import './User.css'
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';

import { logout, getCurrentUser } from "./services/auth.service";
import UserService from "./services/user.service";

function User() {
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState([]);
  const [size, setSize] = useState(8);
  const [messagePW, setMessagePW] = useState("");
  const [messageUN, setMessageUN] = useState("");
  const [hideRoleInfo, setHideRoleInfo] = useState(true);
  const history = useHistory();
  const currentUser = getCurrentUser();
  const [currUsername, setCurrUsername] = useState(currentUser.username);

  var rights = []
  var sizeRightSection = 6

  if (currentUser !== null) {
    rights = currentUser.rights
  }

  if (!(rights.includes('READ_USER_VIEW') || rights.includes('ADMIN'))) {
    history.push('/unauthorized')
  }

  if (rights.includes('WRITE_OWN_USR_SETTINGS') || rights.includes('ADMIN')) {
    sizeRightSection = 4
  }

  useEffect(() => {
    UserService.getRolesRights().then((response) => {
      setRoles(response.data)
      setRole(response.data[0])
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

  const handleCellClick = (event, role_id) => {
    if (role_id === role.role_id) {
      setHideRoleInfo(!hideRoleInfo)
      if (hideRoleInfo) {
        if (rights.includes('WRITE_OWN_USR_SETTINGS') || rights.includes('ADMIN')) {
          setSize(4)
        } else {
          setSize(6)
        }
      } else {
        if (rights.includes('WRITE_OWN_USR_SETTINGS') || rights.includes('ADMIN')) {
          setSize(8)
        } else {
          setSize(12)
        }
      }
    } else {
      if (hideRoleInfo) {
        setHideRoleInfo(false)
        if (rights.includes('WRITE_OWN_USR_SETTINGS') || rights.includes('ADMIN')) {
          setSize(4)
        } else {
          setSize(6)
        }
      }
    }

    setRole(roles.find(role => role.role_id === role_id))
  }

  const handleClickDeleteUsr = () => {
    UserService.deleteUsr().then((response) => {
      console.log(response.data)
      logout()
      history.push('/');
    },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(_content);
      }
    )
  }

  const handleClickChangeUsername = () => {
    var username = document.getElementById('username').value
     
    UserService.changeUsername(username).then((response) => {
      setMessageUN(response.data.message);
      currentUser.username = username;
      localStorage.setItem("user", JSON.stringify(currentUser));
      setCurrUsername(username)
    },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessageUN(_content);
      }
    )

    document.getElementById('username').value = ''

  }

  const handleClickChangePassword = () => {
    var password = document.getElementById('old_pass').value
    var password_new = document.getElementById('new_pass').value
    var password_new_again = document.getElementById('new_again_pass').value

    if (password_new === password_new_again) {
      UserService.changePassword(password, password_new).then((response) => {
        setMessagePW(response.data.message)
      },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessagePW(_content);
        }
      )
    } else {
      setMessagePW('The passwords does not match.')
    }
    document.getElementById('old_pass').value = ''
    document.getElementById('new_pass').value = ''
    document.getElementById('new_again_pass').value = ''
  }

  return (
    <div>
      <h1>User Self Service for {currUsername}</h1>
      <Grid container spacing={3}>
        <Grid item sm={4} hidden={!(rights.includes('WRITE_OWN_USR_SETTINGS') || rights.includes('ADMIN'))}>
          <div className="container__user">
            <h2>Change your user settings</h2>

            <p>Here you can change your username. It is  necessary that your username is unique.</p>

            <div className="change__nickname">
              {messageUN && (
                <div className="response">
                  {messageUN}
                </div>
              )}

              <label>New nickname</label>
              <input type="text" id="username" name="username" />
              <Button variant="contained" color="primary" disableElevation onClick={handleClickChangeUsername}>
                Accept
              </Button>
            </div>
            <div className="middleline"></div>

            <p>Here you can change your current password.</p>

            <div className='change__password__section'>

              {messagePW && (
                <div className="response">
                  {messagePW}
                </div>
              )}

              <label>Old password:</label>
              <input type="password" id="old_pass" name="password" minLength="8" required />
              <label>New Password:</label>
              <input type="password" id="new_pass" name="password" minLength="8" required />
              <label>New Password again:</label>
              <input type="password" id="new_again_pass" name="password" minLength="8" required />
              <Button variant="contained" color="primary" disableElevation onClick={handleClickChangePassword}>
                Accept new password
              </Button>
            </div>
            <div className="middleline"></div>
            <div className='delete__profile'>
              <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={handleClickDeleteUsr}>
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
        <Grid item sm={sizeRightSection} hidden={hideRoleInfo}>
          <div className='table__container' >
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
