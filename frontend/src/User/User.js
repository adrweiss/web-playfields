import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';

import Button from '@material-ui/core/Button';
import './User.css'
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';

import { logout, getCurrentUser } from "../services/auth.service";
import UserService from "../services/user.service";

Modal.setAppElement('body')

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overlay: { zIndex: 9999 }
  }
};

function User() {
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState([]);
  const [size, setSize] = useState(8);
  const [messagePW, setMessagePW] = useState("");
  const [messageUN, setMessageUN] = useState("");
  const [timerId, setTimerId] = useState();

  const [hideRoleInfo, setHideRoleInfo] = useState(true);
  const [modalDelete, setModalDelete] = useState(false);
  const [username, setUsername] = useState(false);
  const [passwordOld, setPasswordOld] = useState(false);
  const [passwordNew, setPasswordNew] = useState(false);
  const [passwordNewAgain, setPasswordNewAgain] = useState(false);
  
  const history = useHistory();
  const currentUser = getCurrentUser();

  var sizeRightSection = 6

  if (!(currentUser?.rights.includes('READ_USER_VIEW') || currentUser?.rights.includes('ADMIN'))) {
    history.push('/unauthorized')
  }

  const [currUsername, setCurrUsername] = useState(currentUser.username);

  if (currentUser?.rights.includes('WRITE_OWN_USR_SETTINGS') || currentUser?.rights.includes('ADMIN')) {
    sizeRightSection = 4
  }

  function removeMessage() {
    setMessagePW("")
    setMessageUN("")
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
        if (currentUser?.rights.includes('WRITE_OWN_USR_SETTINGS') || currentUser?.rights.includes('ADMIN')) {
          setSize(4)
        } else {
          setSize(6)
        }
      } else {
        if (currentUser?.rights.includes('WRITE_OWN_USR_SETTINGS') || currentUser?.rights.includes('ADMIN')) {
          setSize(8)
        } else {
          setSize(12)
        }
      }
    } else {
      if (hideRoleInfo) {
        setHideRoleInfo(false)
        if (currentUser?.rights.includes('WRITE_OWN_USR_SETTINGS') || currentUser?.rights.includes('ADMIN')) {
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
    removeMessage()
    clearTimeout(timerId)

    UserService.changeUsername(username.value).then((response) => {
      setMessageUN(response.data.message);
      currentUser.username = username.value;
      localStorage.setItem("user", JSON.stringify(currentUser));
      setCurrUsername(username.value)
      setTimerId(setTimeout(removeMessage, 10000));
    },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessageUN(_content);
        setTimerId(setTimeout(removeMessage, 10000));
      }
    )
  }

  const handleClickChangePassword = () => {
    removeMessage()
    clearTimeout(timerId)

    if (passwordNew.value === passwordNewAgain.value) {
      UserService.changePassword(passwordOld.value, passwordNew.value).then((response) => {
        setMessagePW(response.data.message)
        setTimerId(setTimeout(removeMessage, 10000));
      },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessagePW(_content);
          setTimerId(setTimeout(removeMessage, 10000));
        }
      )
    } else {
      setMessagePW('The passwords does not match.')
      setTimerId(setTimeout(removeMessage, 10000));
    }
  }

  const modaldeleteUser = () => {
    setModalDelete(!modalDelete)
  }

  return (
    <div>
      <h1>User Self Service for&nbsp;<em>{currUsername}</em></h1>
      <Grid container spacing={3}>
        <Grid item sm={4} hidden={!(currentUser?.rights.includes('WRITE_OWN_USR_SETTINGS') || currentUser?.rights.includes('ADMIN'))}>
          <div className="container__user">
            <h2>Change your user settings</h2>

            <p>Here you can change your username. It is  necessary that your username is unique.</p>

            <div className="change__nickname">
              {messageUN && (
                <div className="response">
                  {messageUN}
                </div>
              )}

              <TextField
                className="input__user__self_service"
                label="New username "
                inputRef={element => setUsername(element)}
                variant="outlined"
                margin="normal"
              />

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

              <TextField
                className="input__user__self_service"
                label="Old Password"
                type="password"
                margin="normal"
                inputRef={element => setPasswordOld(element)}
                variant="outlined"
              />

              <TextField
                className="input__user__self_service"
                label="New Password"
                type="password"
                margin="normal"
                inputRef={element => setPasswordNew(element)}
                variant="outlined"
              />

              <TextField
                className="input__user__self_service"
                label="New Password Again"
                type="password"
                margin="normal"
                inputRef={element => setPasswordNewAgain(element)}
                variant="outlined"
              />

              <Button variant="contained" color="primary" disableElevation onClick={handleClickChangePassword}>
                Accept new password
              </Button>
            </div>
            <div className="middleline"></div>
            <div className='delete__profile'>
              <Button variant="contained" color="secondary" disabled={currentUser?.rights.includes('ADMIN')} startIcon={<DeleteIcon />} onClick={modaldeleteUser}>
                Delete Profile
              </Button>
            </div>
          </div>
        </Grid>
        <Grid item sm={size}>
          <div className='table__container'>
            <h2>List of assigned roles</h2>
            <TableContainer className='tableContainer'>
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
            <TableContainer className='tableContainer'>
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
      <Modal
        isOpen={modalDelete}
        onRequestClose={modaldeleteUser}
        style={customStyles}
        contentLabel="Delete_User"
      >
        <div className='modal__delete'>
          <h3>Delete User</h3>
          <p>Are you sure that you want to delete your user?</p>
          <div />
          <Button variant="contained" onClick={handleClickDeleteUsr} color="secondary">Delete</Button>
          <Button variant="contained" onClick={modaldeleteUser}>Close</Button>
        </div>
      </Modal>
    </div>
  )
}

export default User
