import React, { useState, useEffect } from 'react'
import './Roles.Overview.css'
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ManagementRoleService from '../services/mgt.role.service'
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Modal from 'react-modal';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
};

Modal.setAppElement('body')

function Row(props) {
  const { role } = props;
  const [open, setOpen] = useState(false);
  const [modalIsOpenEditRole, setmodalIsOpenEditRole] = useState(false);

  const modalEditRole = () => {
    console.log(role)
    setOpen(false)
    setmodalIsOpenEditRole(!modalIsOpenEditRole);
  }

  
  return (
    <React.Fragment>
      <TableRow hover>
        <TableCell align='center'>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell onClick={modalEditRole} align="left">{role.role_name}</TableCell>
        <TableCell onClick={modalEditRole} align="left">{role.role_created_at}</TableCell>
        <TableCell onClick={modalEditRole} align="left">{role.role_description}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <h4>Assigend rights</h4>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Right name</TableCell>
                    <TableCell align="left">Assigned to Role</TableCell>
                    <TableCell align="left">Right description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {role.rights.map((right) => (
                    <TableRow key={right.right_id}>
                      <TableCell align="left">{right.right_name}</TableCell>
                      <TableCell align="left">{right.right_description}</TableCell>
                      <TableCell align="left">{right.right_assigned_to}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Modal
        isOpen={modalIsOpenEditRole}
        onRequestClose={modalEditRole}
        style={customStyles}
        contentLabel="edit_existing_role"
      >
        <div>
          <h1>Edit Existing Role</h1>
          <div>
            Test
            {role.role_name}
            Delete Button
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
}

function RolesOverview() {
  const [roles, setRoles] = useState([]);
  const [modalIsOpenCreateRole, setIsOpenCreateRole] = useState(false);

  useEffect(() => {
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

  function openModalCreateRole() {
    setIsOpenCreateRole(true);
  }

  function closeModalCreateRole() {
    setIsOpenCreateRole(false);
  }

  return (
    <div>
      <h2>The overview of all roles to which you have access yourself</h2>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align='center' width="7px">
                <IconButton onClick={openModalCreateRole}>
                  <Tooltip title="Create new Role" aria-label="add">
                    <AddIcon fontSize='small' />
                  </Tooltip>
                </IconButton>
              </TableCell>
              <TableCell align="left" width="100px">Name</TableCell>
              <TableCell align="left" width="200px">Created at</TableCell>
              <TableCell align="left">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles?.map((role) => (
              <Row key={role.role_id} role={role} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        isOpen={modalIsOpenCreateRole}
        onRequestClose={closeModalCreateRole}
        style={customStyles}
        contentLabel="creat_new_role"
      >
        <div>
          <h1>Create a new role</h1>

          <div>
            <label>Role name</label>
            <input type="text" id="role_name" name="role_name" />
            <label>Role Description</label>
            <input type="text" id="role_description" name="role_description" />
            <label>Set Rights</label>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default RolesOverview;