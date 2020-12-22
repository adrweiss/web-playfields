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
import Button from '@material-ui/core/Button'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

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
  const { role } = props;
  const [open, setOpen] = useState(false);
  const [modalIsOpenEditRole, setmodalIsOpenEditRole] = useState(false);
  const [modalAdmin, setmodalAdmin] = useState(false);

  const modalEditRole = () => {
    if (role.role_name !== 'ADMIN') {
      setmodalIsOpenEditRole(!modalIsOpenEditRole);
    } else {
      setmodalAdmin(!modalAdmin)
    }
  }

  function closeModalAdmin() {
    setmodalAdmin(false)
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
              <Table size="small">
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
            {role.role_description}
            Delete Button
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

  useEffect(() => {
    ManagementRoleService.getRoles().then((response) => {
      setRoles(response.data)
      analysisDate(response.data)
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
    const accessRights = [];
    function analysisDate(data) {
      data.forEach(dataRow => {
        dataRow.rights.forEach(dataRowRight => {
          if (dataRowRight.right_name !== 'ADMIN') {
            accessRights.push(dataRowRight);
          }
        })
      })
      const unique = [...new Map(accessRights.map(item => [item['right_id'], item])).values()]
      setAllRights(unique)
    }
  }, [])


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

    var name =  roleName.value.toUpperCase().replace(' ', '_')
    var description = roleDescription.value
    
    setAllRightsforModel([])
    setRightsForNewRole([])
    setIsOpenCreateRole(false);

    ManagementRoleService.createRole(name, description, accessRights).then((response) => {
      setMessage(response.data.message);
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

          <div className='modal__create__role'>

            <TextField
              className='input__field__name'
              label="Role Name"
              margin="normal"
              inputRef={element => setroleName(element)} 
              variant="outlined" />

            <TextField className='input__field__desciption'
              label="Role Description"
              margin="normal"
              inputRef={element => setRoleDescription(element)} 
              variant="outlined" />

            {rightsForNewRole.length !== 0 && (
              <TableContainer>
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