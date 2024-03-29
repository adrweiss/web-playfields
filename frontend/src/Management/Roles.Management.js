import React, { useState, useEffect } from 'react'
import './Roles.Management.css'
import ManagementRoleService from '../services/mgt.role.service'

import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Modal from 'react-modal';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';

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


function Row(props) {
  const { role, allRights } = props;
  const [open, setOpen] = useState(false);
  const [modalIsOpenEditRole, setModalIsOpenEditRole] = useState(false);
  const [modalAdmin, setModalAdmin] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [message, setMessage] = useState("");
  const [messageEdit, setMessageEdit] = useState("");
  const [deleteButton, setDeleteButton] = useState(false);
  const [dataDeleted, setDataDeleted] = useState(true);
  const [roleName, setroleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [rightsForNewRole, setRightsForNewRole] = useState([]);
  const [allRightsforModel, setAllRightsforModel] = useState([]);
  const [roleNameTable, setRoleNameTable] = useState(role.role_name);
  const [roleDescriptionTable, setRoleDescriptionTable] = useState(role.role_description);
  const [currentRights, setCurrentRights] = useState(role.rights);


  var rightsRole = currentRights
  const temp = []

  rightsRole.forEach(right => {
    temp.push(right.right_id)
  })

  rightsRole = allRights.filter((el) => !temp.includes(el.right_id))

  const modalEditRole = () => {
    if (role.role_name !== 'ADMIN') {
      setAllRightsforModel(rightsRole)
      setRightsForNewRole(currentRights)

      setModalIsOpenEditRole(!modalIsOpenEditRole);
    } else {
      setModalAdmin(!modalAdmin)
    }
  }

  function closeModalAdmin() {
    setModalAdmin(false)
  }

  const modaDeleteRole = () => {
    setDeleteButton(false)
    if (role.role_name === 'ADMIN') {
      setModalAdmin(!modalAdmin)
    } else {
      setModalDelete(!modalDelete)
    }
  }

  const deleteRole = () => {
    setDeleteButton(true)
    ManagementRoleService.deleteRole(role.role_id).then((response) => {
      setMessage(response.data.message);
      setDataDeleted(false)
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

  function getCompleteRight(right_name) {
    setRightsForNewRole([...rightsForNewRole, allRights.find(element => element.right_name === right_name)]);
    setAllRightsforModel(allRightsforModel.filter(element => element.right_name !== right_name))
  }

  const removeItemFromCreate = (event, right_id) => {
    setRightsForNewRole(rightsForNewRole.filter(element => element.right_id !== right_id))
    setAllRightsforModel([...allRightsforModel, allRights.find(element => element.right_id === right_id)]);
  }

  const editExistingRole = () => {
    const accessRights = [];
    rightsForNewRole.forEach(right => {
      accessRights.push(right.right_id);
    })

    var name = roleName.value.toUpperCase().replace(' ', '_')
    var description = roleDescription.value

    ManagementRoleService.editRole(role.role_id, name, description, accessRights).then((response) => {
      setModalIsOpenEditRole(!modalIsOpenEditRole);
      setRoleNameTable(name)
      setRoleDescriptionTable(description)
      setCurrentRights(rightsForNewRole)
      console.log(response.data.message)
    },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessageEdit(_content);
      })
  }


  return (
    <React.Fragment>
      {dataDeleted && (
        <TableRow hover>
          <TableCell align='center'>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell onClick={modalEditRole} align="left">{roleNameTable}</TableCell>
          <TableCell onClick={modalEditRole} align="left">{role.role_created_at}</TableCell>
          <TableCell onClick={modalEditRole} align="left">{roleDescriptionTable}</TableCell>
          <TableCell align="left">
            {roleNameTable !== 'ADMIN' && (
              <IconButton onClick={modaDeleteRole} >
                <Tooltip title="Delete Role" aria-label="delete">
                  <DeleteIcon fontSize='small' />
                </Tooltip>
              </IconButton>
            )}
          </TableCell>
        </TableRow>
      )}
      {dataDeleted && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <h4>Assigend rights</h4>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Right name</TableCell>
                      <TableCell align="left">Assigned to Role</TableCell>
                      <TableCell align="left">Right description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentRights.map((right) => (
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
      )}
      <Modal
        isOpen={modalIsOpenEditRole}
        onRequestClose={modalEditRole}
        style={customStyles}
        contentLabel="edit_existing_role"
      >
        <div>
          {messageEdit && (
            <div className="response">
              {messageEdit}
            </div>
          )}
          <h1>Edit Existing Role</h1>
          <div className='modal__create__role'>

            <TextField
              className='input__field__name'
              label="Role Name"
              margin="normal"
              defaultValue={roleNameTable}
              inputRef={element => setroleName(element)}
              variant="outlined" />

            <TextField
              className='input__field__desciption'
              label="Role Description"
              margin="normal"
              defaultValue={roleDescriptionTable}
              inputRef={element => setRoleDescription(element)}
              variant="outlined" />

            {rightsForNewRole.length !== 0 && (
              <TableContainer className='edit__rights__modal__table'>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell align="left">Right Name</TableCell>
                      <TableCell align="left">Right Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rightsForNewRole?.map((right) => (
                      <TableRow key={right.right_id}>
                        <TableCell align='center' width="5px">
                          <IconButton onClick={(event) => removeItemFromCreate(event, right.right_id)}>
                            <Tooltip title="Remove right from list" aria-label="add">
                              <RemoveCircleOutlineIcon fontSize='small' />
                            </Tooltip>
                          </IconButton>
                        </TableCell>
                        <TableCell align="left">{right.right_name}</TableCell>
                        <TableCell align="left">{right.right_description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={allRightsforModel?.map((right) => right.right_name)}
              onChange={(event, newValue) => {
                getCompleteRight(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Right"
                  margin="normal"
                  variant="outlined"
                  InputProps={{ ...params.InputProps, type: 'search' }}
                />
              )}
            />
            <Button variant="contained" color="primary" disableElevation onClick={editExistingRole}>
              Edit Role
            </Button>
          </div>

        </div>
      </Modal>
      <Modal
        isOpen={modalAdmin}
        onRequestClose={closeModalAdmin}
        style={customStyles}
        contentLabel="EDIT_ADMIN"
      >
        <div>
          <h3>Its not allowed to change the ADMIN Role.</h3>
        </div>
      </Modal>
      <Modal
        isOpen={modalDelete}
        onRequestClose={modaDeleteRole}
        style={customStyles}
        contentLabel="Delete_Role"
      >
        <div className='modal__delete'>
          {message && (
            <div className="response">
              {message}
            </div>
          )}
          <h3>Delete {roleNameTable}?</h3>
          <p>Are you sure that you want to delete the Role "{roleNameTable}"?</p>
          <div />
          <Button variant="contained" onClick={deleteRole} color="secondary" disabled={deleteButton}>Delete</Button>
          <Button variant="contained" onClick={modaDeleteRole}>Close</Button>
        </div>
      </Modal>
    </React.Fragment>
  );
}

function RolesOverview() {
  const [roles, setRoles] = useState([]);
  const [allRights, setAllRights] = useState([]);
  const [allRightsforModel, setAllRightsforModel] = useState([]);
  const [modalIsOpenCreateRole, setIsOpenCreateRole] = useState(false);
  const [rightsForNewRole, setRightsForNewRole] = useState([]);
  const [roleName, setroleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [message, setMessage] = useState("");
  const [timerId, setTimerId] = useState();

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

    ManagementRoleService.getRights().then((response) => {
      setAllRights(response.data)
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

  function loadRights() {
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
  }

  function removeMessage() {
    setMessage("")
  }
 
  function openModalCreateRole() {
    setAllRightsforModel(allRights)
    setroleName("")
    setRoleDescription("")
    setIsOpenCreateRole(true);
  }

  function closeModalCreateRole() {
    setAllRightsforModel([])
    setRightsForNewRole([])
    setIsOpenCreateRole(false);
  }

  function getCompleteRight(right_name) {
    setRightsForNewRole([...rightsForNewRole, allRights.find(element => element.right_name === right_name)]);
    setAllRightsforModel(allRightsforModel.filter(element => element.right_name !== right_name))
  }

  const removeItemFromCreate = (event, right_id) => {
    setRightsForNewRole(rightsForNewRole.filter(element => element.right_id !== right_id))
    setAllRightsforModel([...allRightsforModel, allRights.find(element => element.right_id === right_id)]);
  }

  

  const createNewRole = () => {
    const accessRights = [];
    rightsForNewRole.forEach(right => {
      accessRights.push(right.right_id);
    })

    var name = roleName.value.toUpperCase().replace(' ', '_')
    var description = roleDescription.value

    setAllRightsforModel([])
    setRightsForNewRole([])
    setIsOpenCreateRole(false);

    clearTimeout(timerId)

    ManagementRoleService.createRole(name, description, accessRights).then((response) => {
      setMessage(response.data.message);
      setTimerId(setTimeout(removeMessage, 10000));
      loadRights();
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
  }

  return (
    <div>
      <h2>The overview of all roles to which you have access yourself</h2>

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
          <Tooltip title="Search for Role" aria-label="search">
            <SearchIcon />
          </Tooltip>
        </Button>
      </div>
      <TableContainer>
        <Table>
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
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {roles?.map((role) => (
              <Row key={role.role_id} role={role} allRights={allRights} />
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

          <div className='modal__create__role'>

            <TextField
              className='input__field__name'
              label="Role Name"
              margin="normal"
              inputRef={element => setroleName(element)}
              variant="outlined" />

            <TextField
              className='input__field__desciption'
              label="Role Description"
              margin="normal"
              inputRef={element => setRoleDescription(element)}
              variant="outlined" />

            {rightsForNewRole.length !== 0 && (
              <TableContainer className='edit__rights__modal__table'>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell align="left">Right Name</TableCell>
                      <TableCell align="left">Right Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rightsForNewRole?.map((right) => (
                      <TableRow key={right.right_id}>
                        <TableCell align='center' width="5px">
                          <IconButton onClick={(event) => removeItemFromCreate(event, right.right_id)}>
                            <Tooltip title="Remove right from list" aria-label="add">
                              <RemoveCircleOutlineIcon fontSize='small' />
                            </Tooltip>
                          </IconButton>
                        </TableCell>
                        <TableCell align="left">{right.right_name}</TableCell>
                        <TableCell align="left">{right.right_description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={allRightsforModel?.map((right) => right.right_name)}
              onChange={(event, newValue) => {
                getCompleteRight(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Right"
                  margin="normal"
                  variant="outlined"
                  InputProps={{ ...params.InputProps, type: 'search' }}
                />
              )}
            />
            <Button variant="contained" color="primary" disableElevation onClick={createNewRole}>
              Creaet New Role
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default RolesOverview;