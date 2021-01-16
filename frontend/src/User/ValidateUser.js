import React from 'react'
import Button from '@material-ui/core/Button';
import queryString from 'query-string';


function ValidateUser() {
  var urlParam = queryString.parse(window.location.search)
  console.log(urlParam.vk)
  console.log(urlParam.userid)

  return (
    <div>
      <h1>Validate your account</h1>
      <div>
        Please press the button to validate your mail address.
      </div>
      <Button variant="contained" color="primary">
        Validate
      </Button>
    </div>
  )
}

export default ValidateUser
