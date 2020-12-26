import React, { useState, useEffect } from 'react';
import './User.Management.css'
import ManagementUserService from '../services/mgt.user.service'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';





function UserOverview() {
  const [userData, setUserData] = useState([]);

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
  // delete User
  // block User
  // change password from user
  // change Role from user
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Username</TableCell>
            <TableCell align="left">Mail</TableCell>
            <TableCell align="left">created</TableCell>
            <TableCell align="left">blocked</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData?.map((row) => (
            <TableRow key={row.user_id}>
              <TableCell align="left">{row.username}</TableCell>
              <TableCell align="left">{row.user_mail}</TableCell>
              <TableCell align="left">{row.created}</TableCell>
              <TableCell align="left">{1}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserOverview