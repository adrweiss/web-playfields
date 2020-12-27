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
  const [message, setMessage] = useState("");
  const [modalUser, setModalUser] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);

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

  function getData (){
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

  const blockUser = (event, userId, blocked) => {
    ManagementUserService.blockUsr(userId, blocked).then((response) => {
      setMessage(response.data.message)
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
      })
  }

  const deleteUser = (event, userId) => {
    ManagementUserService.deleteUsr(userId).then((response) => {
      setMessage(response.data.message)
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
      })
  }

  const interactModalUser = () => {
    setModalUser(!modalUser)
  }

  const interactModalPassword = (event, userid) => {
    setModalPassword(!modalPassword)
  }

 
  return (
    <div>
      <h2>The overview over all users</h2>
      {message && (
        <div className="response">
          {message}
        </div>
      )}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" width="100px">Username</TableCell>
              <TableCell align="left" width="100px">Mail</TableCell>
              <TableCell align="left" width="100px">Roles</TableCell>
              <TableCell align="left" width="200px" >Created</TableCell>
              <TableCell align="left" width="200px">Last Update</TableCell>
              <TableCell align="left">Block</TableCell>
              <TableCell align="left">Delete</TableCell>
              <TableCell align="left">Password</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData?.map((row) => (
              <TableRow key={row.user_id}>
                <TableCell onClick={interactModalUser} align="left">{row.username}</TableCell>
                <TableCell onClick={interactModalUser} align="left">{row.user_mail}</TableCell>
                <TableCell onClick={interactModalUser} align="left">{"roles"}</TableCell>
                <TableCell onClick={interactModalUser} align="left">{row.created}</TableCell>
                <TableCell onClick={interactModalUser} align="left">{row.lastChange}</TableCell>
                {row.blocked ? (
                  <TableCell align="left">
                    <Button onClick={(event) => blockUser(event, row.user_id, false)}>
                      <Tooltip title="Block user" aria-label="block_user">
                        <LockIcon fontSize='small' />
                      </Tooltip>
                    </Button>
                  </TableCell>
                ) : (
                    <TableCell align="left">
                      <Button onClick={(event) => blockUser(event, row.user_id, true)}>
                        <Tooltip title="Block user" aria-label="block_user">
                          <LockOpenIcon fontSize='small' />
                        </Tooltip>
                      </Button>
                    </TableCell>
                  )}
                   <TableCell align="left">
                      <Button onClick={(event) => deleteUser(event, row.user_id)}>
                        <Tooltip title="Delete user" aria-label="delete_user">
                          <DeleteIcon fontSize='small' />
                        </Tooltip>
                      </Button>
                    </TableCell>
                    <TableCell align="left">
                      <Button onClick={(event) => interactModalPassword(event, row.user_id)}>
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
        isOpen={modalUser}
        onRequestClose={interactModalUser}
        style={customStyles}
        contentLabel="handle_user"
      >
        <div>
          <h3>change roles.</h3>
        </div>
      </Modal>
      <Modal
        isOpen={modalPassword}
        onRequestClose={interactModalPassword}
        style={customStyles}
        contentLabel="handle_user_password"
      >
        <div>
          <h3>change password</h3>
        </div>
      </Modal>
    </div>
  );
}

export default UserOverview