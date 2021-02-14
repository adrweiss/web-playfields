import React from 'react'
import './Home.Management.css'

import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

import { getCurrentUser } from "../services/auth.service";

function HomeManagement() {
  const [checkedBugSolved, setCheckedBugSolved] = React.useState(false);
  const [checkedContactSolved, setCheckedContactSolved] = React.useState(false);
  const [checkedReportSolved, setCheckedReportSolved] = React.useState(false);
  const [checkedBugUnSolved, setCheckedBugUnSolved] = React.useState(true);
  const [checkedContactUnSolved, setCheckedContactUnSolved] = React.useState(true);
  const [checkedReportUnSolved, setCheckedReportUnSolved] = React.useState(true);
  const [checkedReportDeleted, setCheckedReportDeleted] = React.useState(false);

  const currentUser = getCurrentUser();

  const handleChangeBugSolved = (event) => {setCheckedBugSolved(event.target.checked)};
  const handleChangeContactSolved = (event) => {setCheckedContactSolved(event.target.checked)};
  const handleChangeReportSolved = (event) => {setCheckedReportSolved(event.target.checked)};
  const handleChangeBugUnSolved = (event) => {setCheckedBugUnSolved(event.target.checked)};
  const handleChangeContactUnSolved = (event) => {setCheckedContactUnSolved(event.target.checked)};
  const handleChangeReportUnSolved = (event) => {setCheckedReportUnSolved(event.target.checked)};
  const handleChangeReportDeleted = (event) => {setCheckedReportDeleted(event.target.checked)};
  

  return (
    <div>
      <Grid container spacing={1}>
      {(currentUser?.rights.includes('READ_BUG_REPORTS') || currentUser?.rights.includes('ADMIN')) && (
        <Grid className="management__home__message__container" item sm={4}>
          <Checkbox
            checked={checkedBugSolved}
            onChange={handleChangeBugSolved}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          unsolved
          <Checkbox
            checked={checkedBugUnSolved}
            onChange={handleChangeBugUnSolved}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          solved
        </Grid>
      )}
      {(currentUser?.rights.includes('READ_CONTACT_REQUESTS') || currentUser?.rights.includes('ADMIN')) && (
        <Grid className="management__home__message__container" item sm={4}>
        <Checkbox
            checked={checkedContactSolved}
            onChange={handleChangeContactSolved}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          unsolved
          <Checkbox
            checked={checkedContactUnSolved}
            onChange={handleChangeContactUnSolved}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          solved
        </Grid>
      )}
      {(currentUser?.rights.includes('READ_POST_REPORTS') || currentUser?.rights.includes('ADMIN')) && (
        <Grid className="management__home__message__container" item sm={4}>
        <Checkbox
            checked={checkedReportSolved}
            onChange={handleChangeReportSolved}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          unsolved
          <Checkbox
            checked={checkedReportUnSolved}
            onChange={handleChangeReportUnSolved}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          solved
          <Checkbox
            checked={checkedReportDeleted}
            onChange={handleChangeReportDeleted}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          deleted
        </Grid>
      )}
      </Grid>
    </div>
  )
}

export default HomeManagement
