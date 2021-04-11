import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './User.Management.css'
import ManagementUserService from '../services/mgt.user.service'
import ManagementRoleService from '../services/mgt.role.service'
import { getCurrentUser } from "../services/auth.service";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DeleteIcon from '@material-ui/icons/Delete';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import SearchIcon from '@material-ui/icons/Search';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';

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
  const [roles, setRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [message, setMessage] = useState("");
  const [messageModal, setMessageModal] = useState("");
  const [modalUser, setModalUser] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalForbidden, setModalForbidden] = useState(false);
  const [NewPasswordRepeat, setNewPasswordRepeat] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [timerId, setTimerId] = useState();
  const [currentUserName, setCurrentUserName] = useState("");
  const [unselectedRoles, setUnselectedRoles] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const currentUser = getCurrentUser();

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

    ManagementRoleService.getRoles().then((response) => {
      setRoles(response.data)
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

  function removeMessage() {
    setMessageModal("")
    setMessage("")
  }

  function getData() {
    removeMessage()
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

  function createRoleString(roles) {
    const roleNames = []
    roles.forEach(role => {
      roleNames.push(role.role_name)
    })

    return "(" + roleNames.join(', ') + ")"
  }

  function createRightString(rights) {
    const rightNames = []
    rights?.forEach(right => {
      rightNames.push(right.right_name)
    })

    return "(" + rightNames.join(', ') + ")"
  }

  function checkButton(userId, roles) {
    if (userId === currentUser.id) {
      return true
    }

    if (currentUser?.rights.includes('ADMIN')) {
      return false
    }

    if (roles.filter(element => element.role_name === "ADMIN").length === 0) {
      return false
    }

    return true
  }


  const blockUser = (event, userId, blocked) => {
    clearTimeout(timerId)
    removeMessage()

    ManagementUserService.blockUsr(userId, blocked).then((response) => {
      setMessage(response.data.message)
      setTimerId(setTimeout(removeMessage, 10000));
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
        setTimerId(setTimeout(removeMessage, 10000));
      })
  }

  const validUser = (event, userId) => {
    clearTimeout(timerId)
    removeMessage()

    ManagementUserService.validUsr(userId).then((response) => {
      setMessage(response.data.message)
      setTimerId(setTimeout(removeMessage, 10000));
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
        setTimerId(setTimeout(removeMessage, 10000));
      })
  }


  function deleteUser() {
    clearTimeout(timerId)

    ManagementUserService.deleteUsr(selectedUser[0]).then((response) => {
      setMessage(response.data.message)
      setTimerId(setTimeout(removeMessage, 10000))
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
        setTimerId(setTimeout(removeMessage, 10000))
        closeModalDeleteUser()
      })
  }

  function changePassword() {
    clearTimeout(timerId)

    if (newPassword.value !== NewPasswordRepeat.value) {
      setMessageModal("The passwords does not match.")
      setTimerId(setTimeout(removeMessage, 10000))
      return
    }

    if (newPassword.value.length === 0) {
      setMessageModal("The passwords has the length of 0.")
      setTimerId(setTimeout(removeMessage, 10000))
      return
    }

    ManagementUserService.changePwFromUser(selectedUser[0], newPassword.value).then((response) => {
      setMessage(response.data.message)
      setTimerId(setTimeout(removeMessage, 10000))
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
        setTimerId(setTimeout(removeMessage, 10000))
        closeModalPassword()
      })
  }

  const opentModalUser = (row) => {

    const temp = []
    row.roles.forEach(role => {
      temp.push(role.role_id)
    })

    setUnselectedRoles(roles.filter((el) => !temp.includes(el.role_id)))
    setCurrentUserName(row.username)
    setCurrentUserId(row.user_id)

    if (!checkButton(row.user_id, row.roles)) {
      removeMessage()
      setSelectedUser(row.roles)
      setModalUser(!modalUser)
    } else {
      setModalForbidden(!modalForbidden)
    }
  }

  const openModalPassword = (event, userId, userName) => {
    removeMessage()
    setSelectedUser([userId, userName])
    setModalPassword(!modalPassword)
  }

  const openModalDeleteUser = (event, userId, userName) => {
    removeMessage()
    setSelectedUser([userId, userName])
    setModalDelete(!modalDelete)
  }

  const closeModalPassword = () => {
    setSelectedUser([])
    setModalPassword(!modalPassword)
  }

  const closeModalDeleteUser = () => {
    setSelectedUser([])
    setModalDelete(!modalDelete)
  }

  const closeModalUser = () => {
    setSelectedUser([])
    setModalUser(!modalUser)
    getData()
  }

  const closeModalForbidden = () => {
    setModalForbidden(!modalForbidden)
  }

  function addRole(roleId) {
    clearTimeout(timerId)

    setUnselectedRoles(unselectedRoles.filter(element => element.role_id !== roleId))
    setSelectedUser([...selectedUser, unselectedRoles.find(element => element.role_id === roleId)]);

    ManagementUserService.changeRoleFromUser(currentUserId, 'add', roleId).then((response) => {
      setMessageModal(response.data.message)
      setTimerId(setTimeout(removeMessage, 10000))

    },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessageModal(_content);
        setTimerId(setTimeout(removeMessage, 10000))
      })
  }

  function removeRole(roleId) {
    clearTimeout(timerId)

    setSelectedUser(selectedUser.filter(element => element.role_id !== roleId))
    setUnselectedRoles([...unselectedRoles, selectedUser.find(element => element.role_id === roleId)]);

    ManagementUserService.changeRoleFromUser(currentUserId, 'remove', roleId).then((response) => {
      setMessageModal(response.data.message)
      setTimerId(setTimeout(removeMessage, 10000))

    },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessageModal(_content);
        setTimerId(setTimeout(removeMessage, 10000))
      }
    )
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
          variant="outlined"
          disabled={true} />
        <Button disabled={true}>
          <Tooltip title="Search for User" aria-label="search">
            <SearchIcon />
          </Tooltip>
        </Button>
      </div>

      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" width="100px">Username</TableCell>
              <TableCell align="left" width="100px">Mail</TableCell>
              <TableCell align="left" >Roles</TableCell>
              <TableCell align="left" width="120px" >Created</TableCell>
              <TableCell align="left" width="120px">Last Update</TableCell>
              <TableCell align="center" width="50px">Block</TableCell>
              <TableCell align="center" width="50px">Delete</TableCell>
              <TableCell align="center" width="50px">Password</TableCell>
              <TableCell align="center" width="50px">Valid</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData?.map((row) => (
              <TableRow hover key={row.user_id}>
                <TableCell onClick={(event) => opentModalUser(row)} align="left">{row.username}</TableCell>
                <TableCell onClick={(event) => opentModalUser(row)} align="left">{row.user_mail}</TableCell>
                <TableCell onClick={(event) => opentModalUser(row)} align="left">{createRoleString(row.roles)}</TableCell>
                <TableCell onClick={(event) => opentModalUser(row)} align="left">{row.created}</TableCell>
                <TableCell onClick={(event) => opentModalUser(row)} align="left">{row.lastChange}</TableCell>

                <TableCell align="center">
                  <IconButton onClick={(event) => blockUser(event, row.user_id, (!row.blocked))} disabled={checkButton(row.user_id, row.roles)}>
                    <Tooltip title="Block user" aria-label="block_user">
                      {row.blocked ? (<LockIcon fontSize='small' />) : (<LockOpenIcon fontSize='small' />)}
                    </Tooltip>
                  </IconButton>
                </TableCell>

                <TableCell align="center">
                  <IconButton onClick={(event) => openModalDeleteUser(event, row.user_id, row.username)} disabled={checkButton(row.user_id, row.roles)}>
                    <Tooltip title="Delete user" aria-label="delete_user">
                      <DeleteIcon fontSize='small' />
                    </Tooltip>
                  </IconButton>
                </TableCell>

                <TableCell align="center">
                  <IconButton onClick={(event) => openModalPassword(event, row.user_id, row.username)} disabled={checkButton(row.user_id, row.roles)}>
                    <Tooltip title="Change password from user" aria-label="change_user_password">
                      <VpnKeyIcon fontSize='small' />
                    </Tooltip>
                  </IconButton>
                </TableCell>

                <TableCell align="center">
                  <IconButton onClick={(event) => validUser(event, row.user_id)} disabled={row.validated} >
                    <Tooltip title="Change valid status from user" aria-label="validate_user">
                      {row.validated ? (<CheckBoxOutlinedIcon fontSize='small' />) : (<CheckBoxOutlineBlankOutlinedIcon fontSize='small' />)}
                    </Tooltip>
                  </IconButton>
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
          <p><strong>NOTE:</strong> Password rules do not apply here.</p>
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
        isOpen={modalForbidden}
        onRequestClose={closeModalForbidden}
        style={customStyles}
        contentLabel="Not_allwoed_to_change"
      >
        <div>
          <h3>Its not allowed to change your own user or admin user without admin rights.</h3>
        </div>
      </Modal>

      <Modal
        isOpen={modalUser}
        onRequestClose={closeModalUser}
        style={customStyles}
        contentLabel="handle_user"
      >
        <div className='change__roles__user__modal'>
          <h2>Change roles from user.</h2>
          {messageModal && (
            <div className="response">
              {messageModal}
            </div>
          )}
          <h3>The current roles from user "{currentUserName}"</h3>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" width="7px"></TableCell>
                  <TableCell align="left" width="50px">Rolename</TableCell>
                  <TableCell align="left" width="400px">Rights</TableCell>
                  <TableCell align="left" >Roledescription</TableCell>
                  <TableCell align="left" >Assigend to</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedUser?.map((row, i) => (
                  <TableRow hover key={i}>
                    <TableCell align="center">
                      <IconButton onClick={(event) => removeRole(row.role_id)}>
                        <Tooltip title="Remove role from user.">
                          <RemoveCircleOutlineIcon fontSize='small' />
                        </Tooltip>
                      </IconButton>
                    </TableCell>
                    <TableCell align="left">{row.role_name}</TableCell>
                    <TableCell align="left">{createRightString(row.rights)}</TableCell>
                    <TableCell align="left">{row.role_description}</TableCell>
                    <TableCell align="left">{row.assignment_date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <h3>Roles which are not assigend to the current user.</h3>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" width="7px"></TableCell>
                  <TableCell align="left" width="50px">Rolename</TableCell>
                  <TableCell align="left" width="400px">Rights</TableCell>
                  <TableCell align="left" >Roledescription</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {unselectedRoles?.map((row) => (
                  <TableRow hover key={row.role_id}>
                    <TableCell align="center">
                      <IconButton onClick={(event) => addRole(row.role_id)}>
                        <Tooltip title="Remove role from user.">
                          <AddCircleOutlineIcon fontSize='small' />
                        </Tooltip>
                      </IconButton>
                    </TableCell>
                    <TableCell align="left">{row.role_name}</TableCell>
                    <TableCell align="left">{createRightString(row.rights)}</TableCell>
                    <TableCell align="left">{row.role_description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Modal>
    </div>
  );
}

export default UserOverview