import React from 'react'
import queryString from 'query-string';

function ForgottPassword() {
  var urlParam = queryString.parse(window.location.search)
  console.log(urlParam.rk)

  return (
    <div>
        <h1>Forgott password.</h1>
    </div>
  )
}

export default ForgottPassword
  