import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './User.Management.css'
import ManagementUserService from '../services/mgt.user.service'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DeleteIcon from '@material-ui/icons/Delete';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import SearchIcon from '@material-ui/icons/Search';

import TextField from '@material-ui/core/TextField';

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

function UserOverview() {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [message, setMessage] = useState("");
  const [messageModal, setMessageModal] = useState("");
  const [modalUser, setModalUser] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [NewPasswordRepeat, setNewPasswordRepeat] = useState(false);
  const [newPassword, setNewPassword] = useState(false);

  useEffect(() => {
    ManagementUserService.getUserInfos().then((response) => {
      setUserData(response.data)
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

  setInterval(function () {
    setMessageModal("")
    setMessage("")
  }, 120000);

  function getData() {
    setMessage("")
    ManagementUserService.getUserInfos().then((response) => {
      setUserData(response.data)
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
  }

  function greateRoleString(roles) {
    const roleNames = []
    roles.forEach(role => {
      roleNames.push(role.role_name)
    })

    return "(" + roleNames.join(', ') + ")"
  }

  const blockUser = (event, userId, blocked) => {
    ManagementUserService.blockUsr(userId, blocked).then((response) => {
      getData()
      setMessage(response.data.message)
    },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(_content);
      })
  }

  function deleteUser() {
    ManagementUserService.deleteUsr(selectedUser[0]).then((response) => {
      setMessage(response.data.message)
      closeModalDeleteUser()
      getData()
    },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(_content);
        closeModalDeleteUser()
      })
  }

  function changePassword() {
    if (newPassword.value !== NewPasswordRepeat.value) {
      setMessageModal("The passwords does not match.")
      return
    }

    if (newPassword.value.length === 0) {
      setMessageModal("The passwords has the length of 0.")
      return
    }

    ManagementUserService.changePwFromUser(selectedUser[0], newPassword.value).then((response) => {
      setMessage(response.data.message)
      closeModalPassword()
    },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(_content);
        closeModalPassword()
      })
  }

  const interactModalUser = (roles) => {
    console.log(roles)
    setModalUser(!modalUser)
  }

  const openModalPassword = (event, userId, userName) => {
    setMessageModal("")
    setMessage("")
    setSelectedUser([userId, userName])
    setModalPassword(!modalPassword)
  }

  const closeModalPassword = () => {
    setSelectedUser([])
    setModalPassword(!modalPassword)
  }

  const openModalDeleteUser = (event, userId, userName) => {
    setMessage("")
    setSelectedUser([userId, userName])
    setModalDelete(!modalDelete)
  }

  const closeModalDeleteUser = () => {
    setSelectedUser([])
    setModalDelete(!modalDelete)
  }


  return (
    <div>
      <h2>The overview over all users</h2>

      {message && (
        <div className="response">
          {message}
        </div>
      )}

      <div className="management__header">
        <TextField
          className='search__bar__management'
          id="outlined-search"
          label="Search field"
          type="search"
          size="small"
          variant="outlined" />
        <Button>
          <Tooltip title="Search for User" aria-label="search">
            <SearchIcon />
          </Tooltip>
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" width="100px">Username</TableCell>
              <TableCell align="left" width="100px">Mail</TableCell>
              <TableCell align="left" >Roles</TableCell>
              <TableCell align="left" width="200px" >Created</TableCell>
              <TableCell align="left" width="200px">Last Update</TableCell>
              <TableCell align="center" >Block</TableCell>
              <TableCell align="center" >Delete</TableCell>
              <TableCell align="center">Password</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData?.map((row) => (
              <TableRow key={row.user_id}>
                <TableCell onClick={(event) => interactModalUser(row.roles)} align="left">{row.username}</TableCell>
                <TableCell onClick={(event) => interactModalUser(row.roles)} align="left">{row.user_mail}</TableCell>
                <TableCell onClick={(event) => interactModalUser(row.roles)} align="left">{greateRoleString(row.roles)}</TableCell>
                <TableCell onClick={(event) => interactModalUser(row.roles)} align="left">{row.created}</TableCell>
                <TableCell onClick={(event) => interactModalUser(row.roles)} align="left">{row.lastChange}</TableCell>

                <TableCell align="center">
                  <Button onClick={(event) => blockUser(event, row.user_id, (!row.blocked))}>
                    <Tooltip title="Block user" aria-label="block_user">
                      {row.blocked ? (<LockIcon fontSize='small' />) : (<LockOpenIcon fontSize='small' />)}
                    </Tooltip>
                  </Button>
                </TableCell>

                <TableCell align="center">
                  <Button onClick={(event) => openModalDeleteUser(event, row.user_id, row.username)}>
                    <Tooltip title="Delete user" aria-label="delete_user">
                      <DeleteIcon fontSize='small' />
                    </Tooltip>
                  </Button>
                </TableCell>

                <TableCell align="center">
                  <Button onClick={(event) => openModalPassword(event, row.user_id, row.username)}>
                    <Tooltip title="Change password from user" aria-label="delete_user">
                      <VpnKeyIcon fontSize='small' />
                    </Tooltip>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        isOpen={modalDelete}
        onRequestClose={closeModalDeleteUser}
        style={customStyles}
        contentLabel="Delete_User"
      >
        <div className='modal__delete'>
          <h3>Delete User {selectedUser && (selectedUser[1])}</h3>
          <p>Are you sure that you want to delete your the User {selectedUser && (selectedUser[1])}?</p>

          <div />
          <Button variant="contained" onClick={deleteUser} color="secondary">Delete</Button>
          <Button variant="contained" onClick={closeModalDeleteUser}>Close</Button>
        </div>
      </Modal>

      <Modal
        isOpen={modalPassword}
        onRequestClose={closeModalPassword}
        style={customStyles}
        contentLabel="handle_user_password"
      >
        <div className='modal__change__passsword'>
          {messageModal && (
            <div className="response">
              {messageModal}
            </div>
          )}
          <h3>Change password</h3>
          <p>Change password from user {selectedUser && (selectedUser[1])}.</p>
          <TextField
            className="input__password__modal"
            label="Password"
            type="password"
            inputRef={element => setNewPassword(element)}
            variant="outlined"
          />

          <TextField
            className="input__password__modal"
            label="Repeat Password"
            type="password"
            margin="normal"
            inputRef={element => setNewPasswordRepeat(element)}
            variant="outlined"
          />

          <Button variant="contained" onClick={changePassword} color="primary">Change</Button>
          <Button variant="contained" onClick={closeModalPassword}>Close</Button>
        </div>
      </Modal>

      <Modal
        isOpen={modalUser}
        onRequestClose={interactModalUser}
        style={customStyles}
        contentLabel="handle_user"
      >
        <div>
          <h3>change roles.</h3>
        </div>
      </Modal>
    </div>
  );
}

export default UserOverview