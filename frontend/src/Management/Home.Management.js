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
    ManagementService.getBugMessages("unsolved", 0, 5).then((response) => {
      setMessageFlowBug(response.data);
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
    ManagementService.getContactMessages("unsolved", 0, 5).then((response) => {
      setMessageFlowContacts(response.data);
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
    ManagementService.getReportMessages("unsolved", "undeleted", 0, 5).then((response) => {
      setMessageFlowReports(response.data);
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

  function createStatus(solved, unsolved) {
    if (solved && unsolved) {
      return "all"
    } else if (solved) {
      return "solved"
    } else {
      return "unsolved"
    }
  }

  function getBugReports(status) {
    ManagementService.getAmountPostedBugs(status).then((response) => {
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

    ManagementService.getBugMessages(status).then((response) => {
      setMessageFlowBug(response.data);
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

  function getContactRequests(status) {
    ManagementService.getAmountContactMessages(status).then((response) => {
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
    ManagementService.getContactMessages(status, 0, 5).then((response) => {
      setMessageFlowContacts(response.data);
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

  const handleChangeBugSolved = (event) => {
    setCheckedBugSolved(event.target.checked)
    getBugReports(createStatus(event.target.checked, checkedBugUnSolved))
  };
  const handleChangeContactSolved = (event) => {
    setCheckedContactSolved(event.target.checked)
    getContactRequests(createStatus(event.target.checked, checkedContactUnSolved))
  };
  const handleChangeReportSolved = (event) => {
    setCheckedReportSolved(event.target.checked)
    console.log(createStatus(event.target.checked, checkedReportUnSolved))
  };
  const handleChangeBugUnSolved = (event) => {
    setCheckedBugUnSolved(event.target.checked)
    getBugReports(createStatus(checkedBugSolved, event.target.checked))
  };
  const handleChangeContactUnSolved = (event) => {
    setCheckedContactUnSolved(event.target.checked)
    getContactRequests(createStatus(checkedContactSolved, event.target.checked))
  };
  const handleChangeReportUnSolved = (event) => {
    setCheckedReportUnSolved(event.target.checked)
    console.log(createStatus(checkedReportSolved, event.target.checked))
  };
  const handleChangeReportDeleted = (event) => {
    setCheckedReportDeleted(event.target.checked)

  };


  return (
    <div>
      <Grid container spacing={1}>
        {(currentUser?.rights.includes('READ_BUG_REPORTS') || currentUser?.rights.includes('ADMIN')) && (
          <Grid className="management__home__message__container" item sm={4}>
            <h2>Bug Reports</h2>
            <div>
              <Checkbox
                checked={checkedBugUnSolved}
                onChange={handleChangeBugUnSolved}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              unsolved
              <Checkbox
                checked={checkedBugSolved}
                onChange={handleChangeBugSolved}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              solved
            </div>
            <div>
              {messageFlowBug?.length === 0 ? (
                <div className='write__posts'>
                  <h2>No data available</h2>
                </div>
              ) : (
                  <div>
                    {messageFlowBug?.map(item => (
                      <HomeMessageManagement
                        key={item.id}
                        id={item.id}
                        date={item.date}
                        body={item.body}
                        reason={item.reason}
                        solved={item.solved}
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
            <h2>Contact Requests</h2>
            <div>
              <Checkbox
                checked={checkedContactUnSolved}
                onChange={handleChangeContactUnSolved}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
          unsolved
            <Checkbox
                checked={checkedContactSolved}
                onChange={handleChangeContactSolved}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
          solved
          </div>
            <div>
              {messageFlowContacts?.length === 0 ? (
                <div className='write__posts'>
                  <h2>No data available</h2>
                </div>
              ) : (
                  <div>
                    {messageFlowContacts?.map(item => (
                      <HomeMessageManagement
                        key={item.id}
                        id={item.id}
                        date={item.date}
                        body={item.body}
                        reason={item.reason}
                        solved={item.solved}
                        mail={item.mail}
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
            <h2>Reported Posts</h2>
            <div>
              <Checkbox
                checked={checkedReportUnSolved}
                onChange={handleChangeReportUnSolved}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
          unsolved
            <Checkbox
                checked={checkedReportSolved}
                onChange={handleChangeReportSolved}
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
            <p>{amountReports}</p>
          </Grid>
        )}
      </Grid>
    </div>
  )
}

export default HomeManagement
