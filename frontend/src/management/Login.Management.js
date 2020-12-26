import React, { useState, useEffect } from 'react';
import './Login.Management.css';
import ViewService from '../services/view.service'
import { DataGrid } from '@material-ui/data-grid';

import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip';
import CachedIcon from '@material-ui/icons/Cached';

const columns = [
  { field: 'user', headerName: 'Username', width: 150, description: 'If no value is set, the user is already deleted.' },
  { field: 'status', headerName: 'Login successfull', width: 150, description: 'Status if the login was successfull.' },
  { field: 'date', headerName: 'Date', width: 250, description: 'Timestamp of the login attempt.' },
];

const sortModel = [
  {
    field: 'date',
    sort: 'desc',
  },
];

function LoginManagement() {
  const [loginData, setLoginData] = useState("");

  useEffect(() => {
    ViewService.getViewLoginData().then((response) => {
      setLoginData(response.data)
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

  const reloadData = () => {
    ViewService.getViewLoginData().then((response) => {
      setLoginData(response.data)
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
    <div className='login__table__container'>
      <Button onClick={reloadData}>
        <Tooltip title="Reload data" aria-label="add">
          <CachedIcon />
        </Tooltip>
      </Button>

      {loginData && (
        <DataGrid rows={loginData} sortModel={sortModel} columns={columns} pageSize={10} />
      )}
    </div>
  )
}

export default LoginManagement