import React, { useState, useEffect } from 'react';
import './Delete.Management.css';
import ViewService from '../services/view.service'
import { DataGrid } from '@material-ui/data-grid';

import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip';
import CachedIcon from '@material-ui/icons/Cached';
import SearchIcon from '@material-ui/icons/Search';

import TextField from '@material-ui/core/TextField';

const columns = [
  { field: 'usr_username', headerName: 'Username', width: 150 },
  { field: 'usr_mail', headerName: 'User email', width: 250 },
  { field: 'date', headerName: 'Date', width: 250 },
];

const sortModel = [
  {
    field: 'date',
    sort: 'desc',
  },
];

function DeleteManagement() {
  const [deleteData, setDeleteData] = useState("");

  useEffect(() => {
    ViewService.getViewDeleteData().then((response) => {
      setDeleteData(response.data)
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
    ViewService.getViewDeleteData().then((response) => {
      setDeleteData(response.data)
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
    <div className='delete__table__container'>
      <div className="view__header">
        <Button onClick={reloadData}>
          <Tooltip title="Reload data" aria-label="reload">
            <CachedIcon />
          </Tooltip>
        </Button>
        <TextField
          className='search__bar__view'
          id="outlined-search"
          label="Search field"
          type="search"
          size="small"
          variant="outlined" 
          disabled={true}/>
        <Button disabled={true}>
          <Tooltip title="Search for user" aria-label="search">
            <SearchIcon />
          </Tooltip>
        </Button>

      </div>

      {deleteData && (
        <DataGrid rows={deleteData} sortModel={sortModel} columns={columns} pageSize={10} />
      )}
    </div>
  )
}

export default DeleteManagement
