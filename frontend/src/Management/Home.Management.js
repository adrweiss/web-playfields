import React, { useState, useEffect } from 'react'
import './Home.Management.css'

import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
//import Pagination from '@material-ui/lab/Pagination';

import { getCurrentUser } from "../services/auth.service";
import ManagementService from "../services/mgt.service"
import HomeMessageManagement from "./Home.Message.Management";

function HomeManagement() {
  const [checkedBugSolved, setCheckedBugSolved] = useState(false);
  const [checkedContactSolved, setCheckedContactSolved] = useState(false);
  const [checkedReportSolved, setCheckedReportSolved] = useState(false);
  const [checkedBugUnSolved, setCheckedBugUnSolved] = useState(true);
  const [checkedContactUnSolved, setCheckedContactUnSolved] = useState(true);
  const [checkedReportUnSolved, setCheckedReportUnSolved] = useState(true);
  const [checkedReportDeleted, setCheckedReportDeleted] = useState(false);

  const [amountBug, setAmountBug] = useState([]);
  const [amountContacts, setAmountContacts] = useState([]);
  const [amountReports, setAmountReports] = useState([]);
  const [messageFlowBug, setMessageFlowBug] = useState([]);
  const [messageFlowContacts, setMessageFlowContacts] = useState([]);
  const [messageFlowReports, setMessageFlowReports] = useState([]);



  const currentUser = getCurrentUser();

  const handleChangeBugSolved = (event) => { setCheckedBugSolved(event.target.checked) };
  const handleChangeContactSolved = (event) => { setCheckedContactSolved(event.target.checked) };
  const handleChangeReportSolved = (event) => { setCheckedReportSolved(event.target.checked) };
  const handleChangeBugUnSolved = (event) => { setCheckedBugUnSolved(event.target.checked) };
  const handleChangeContactUnSolved = (event) => { setCheckedContactUnSolved(event.target.checked) };
  const handleChangeReportUnSolved = (event) => { setCheckedReportUnSolved(event.target.checked) };
  const handleChangeReportDeleted = (event) => { setCheckedReportDeleted(event.target.checked) };

  /*
  function createStatus(solved, unsolved) {
    if (solved && unsolved) {
      return "all"
    } else if (solved) {
      return "solved"
    } else {
      return "unsolved"
    }
  }
  */

  useEffect(() => {
    ManagementService.getAmountContactMessages("unsolved").then((response) => {
      setAmountContacts(response.data.amount);
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
    ManagementService.getAmountPostedBugs("unsolved").then((response) => {
      setAmountBug(response.data.amount);
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
    ManagementService.getAmountReportedPosts("unsolved", "undeleted").then((response) => {
      setAmountReports(response.data.amount);
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
    ManagementService.getBugMessages("unsolved").then((response) => {
      setMessageFlowBug(response.data);
      console.log("Bug")
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
    ManagementService.getContactMessages("unsolved").then((response) => {
      setMessageFlowContacts(response.data);
      console.log("Contacts")
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
    ManagementService.getReportMessages("unsolved", "undeleted").then((response) => {
      setMessageFlowReports(response.data);
      console.log("Reports")
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
      <Grid container spacing={1}>
        {(currentUser?.rights.includes('READ_BUG_REPORTS') || currentUser?.rights.includes('ADMIN')) && (
          <Grid className="management__home__message__container" item sm={4}>
            <div>
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
            </div>
            <div>
              {messageFlowBug?.length === 0 ? (
                <div className='write__posts'>
                  <h2>No post available</h2>
                </div>
              ) : (
                  <div>
                    {messageFlowBug?.map(item => (
                      <HomeMessageManagement
                        key={item.id}
                      />
                    ))}
                  </div>
                )}
            </div>
            <p>{amountBug}</p>
          </Grid>
        )}
        {(currentUser?.rights.includes('READ_CONTACT_REQUESTS') || currentUser?.rights.includes('ADMIN')) && (
          <Grid className="management__home__message__container" item sm={4}>
            <div>
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
          </div>
            <div>
              {messageFlowContacts?.length === 0 ? (
                <div className='write__posts'>
                  <h2>No post available</h2>
                </div>
              ) : (
                  <div>
                    {messageFlowContacts?.map(item => (
                      <HomeMessageManagement
                        key={item.id}
                      />
                    ))}
                  </div>
                )}
            </div>
            <p>{amountContacts}</p>
          </Grid>
        )}
        {(currentUser?.rights.includes('READ_POST_REPORTS') || currentUser?.rights.includes('ADMIN')) && (
          <Grid className="management__home__message__container" item sm={4}>
            <div>
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
          </div>
            <div>
              {messageFlowReports?.length === 0 ? (
                <div className='write__posts'>
                  <h2>No post available</h2>
                </div>
              ) : (
                  <div>
                    {messageFlowReports?.map(item => (
                      <HomeMessageManagement
                        key={item.id}
                      />
                    ))}
                  </div>
                )}
            </div>
            <p>{amountReports}</p>
          </Grid>
        )}
      </Grid>
    </div>
  )
}

export default HomeManagement
