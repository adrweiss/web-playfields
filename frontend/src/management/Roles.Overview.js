import React, { useState, useEffect } from 'react'
import ManagementRoleService from '../services/mgt.role.service'


function RolesOverview() {

  useEffect(() => {
    ManagementRoleService.getRoles().then((response) => {
      console.log(response.data)
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
  return (
    <div>
      {'Test for Role Overview.'}
    </div>
  )
}

export default RolesOverview
