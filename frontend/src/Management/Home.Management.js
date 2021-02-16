import React, { useState, useEffect } from 'react'
import './Home.Management.css'

import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import Pagination from '@material-ui/lab/Pagination';

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

  const [resizedBug, setResizedBug] = useState(false)
  const [resizedContact, setResizedContact] = useState(false)
  const [resizedReport, setResizedReport] = useState(false)

  const [bugSize, setBugSize] = useState(4)
  const [contactSize, setContactSize] = useState(4)
  const [reportSize, setReportSize] = useState(4)

  const [amountBug, setAmountBug] = useState();
  const [amountContacts, setAmountContacts] = useState();
  const [amountReports, setAmountReports] = useState();
  const [messageFlowBug, setMessageFlowBug] = useState([]);
  const [messageFlowContacts, setMessageFlowContacts] = useState([]);
  const [messageFlowReports, setMessageFlowReports] = useState([]);

  const currentUser = getCurrentUser();
  const postPSide = 5

  useEffect(() => {
    ManagementService.getAmountContactMessages("unsolved").then((response) => {
      setAmountContacts(Math.ceil(response.data.amount / postPSide));
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
      setAmountBug(Math.ceil(response.data.amount / postPSide));
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
      setAmountReports(Math.ceil(response.data.amount / postPSide));
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
      setAmountBug(Math.ceil(response.data.amount / postPSide));
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

    ManagementService.getBugMessages(status, 0 ,5).then((response) => {
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
      setAmountContacts(Math.ceil(response.data.amount / postPSide));
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

  const handleResizeBug = () => {
    setResizedContact(!resizedContact)
    setResizedReport(!resizedReport)
    if (bugSize === 4) {
      setBugSize(12)
    } else {
      setBugSize(4)
    }
  }
  const handleResizeContact = () => {
    setResizedBug(!resizedBug)
    setResizedReport(!resizedReport)
    if (contactSize === 4) {
      setContactSize(12)
    } else {
      setContactSize(4)
    }
  }
  const handleResizeReport = () => {
    setResizedBug(!resizedBug)
    setResizedContact(!resizedContact)
    if (reportSize === 4) {
      setReportSize(12)
    } else {
      setReportSize(4)
    }
  }
  
  const handleChangePageBug = (event, newPage) => {
    ManagementService.getBugMessages(createStatus(checkedBugSolved, checkedBugUnSolved), ((newPage - 1) * 5) ,5).then((response) => {
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
  const handleChangePageContact = (event, newPage) => {
    ManagementService.getContactMessages(createStatus(checkedContactSolved, checkedContactUnSolved), ((newPage - 1) * 5), 5).then((response) => {
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

  const handleChangePageReport = (event, newPage) => {
    console.log(newPage)
    //fetchPosts(((newPage - 1) * 5))
  }

  return (
    <div>
      <Grid container spacing={1}>
        {(currentUser?.rights.includes('READ_BUG_REPORTS') || currentUser?.rights.includes('ADMIN')) && (
          <Grid className="management__home__message__container" item sm={bugSize} hidden={resizedBug}>
            <h2>Bug Reports</h2>
            <div>
              <IconButton onClick={handleResizeBug}>
                <Tooltip title="resize window" aria-label="resize_window">
                  <AspectRatioIcon />
                </Tooltip>
              </IconButton>
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
            <div className="management__home__message__container">
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
                        type="bug"
                        status={createStatus(checkedBugSolved, checkedBugUnSolved)}
                      />
                    ))}
                  </div>
                )}
            </div>
            <Grid container justify="center">
              <Pagination className="page__number" count={amountBug} variant="outlined" shape="rounded" onChange={handleChangePageBug} />
            </Grid>
          </Grid>
        )}
        {(currentUser?.rights.includes('READ_CONTACT_REQUESTS') || currentUser?.rights.includes('ADMIN')) && (
          <Grid className="management__home__message__container" item sm={contactSize} hidden={resizedContact}>
            <h2>Contact Requests</h2>
            <div>
              <IconButton onClick={handleResizeContact}>
                <Tooltip title="resize window" aria-label="resize_window">
                  <AspectRatioIcon />
                </Tooltip>
              </IconButton>
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
            <div className="management__home__message__container">
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
                        type="contact"
                        status={createStatus(checkedContactSolved, checkedContactUnSolved)}
                      />
                    ))}
                  </div>
                )}
            </div>
            <Grid container justify="center">
              <Pagination className="page__number" count={amountContacts} variant="outlined" shape="rounded" onChange={handleChangePageContact} />
            </Grid>
          </Grid>
        )}
        {(currentUser?.rights.includes('READ_POST_REPORTS') || currentUser?.rights.includes('ADMIN')) && (
          <Grid className="management__home__message__container" item sm={reportSize} hidden={resizedReport}>
            <h2>Reported Posts</h2>
            <div>
              <IconButton onClick={handleResizeReport}>
                <Tooltip title="resize window" aria-label="resize_window">
                  <AspectRatioIcon />
                </Tooltip>
              </IconButton>
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
          <div className="management__home__message__container">
            reports
          </div>
            <Grid container justify="center">
              <Pagination className="page__number" count={amountReports} variant="outlined" shape="rounded" onChange={handleChangePageReport} />
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  )
}

export default HomeManagement
