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
import HomeReportedManagement from "./Home.Reported.Management"

function HomeManagement() {
  const [checkedBugSolved, setCheckedBugSolved] = useState(false);
  const [checkedContactSolved, setCheckedContactSolved] = useState(false);
  const [checkedReportSolved, setCheckedReportSolved] = useState(false);
  const [checkedBugUnSolved, setCheckedBugUnSolved] = useState(true);
  const [checkedContactUnSolved, setCheckedContactUnSolved] = useState(true);
  const [checkedReportUnSolved, setCheckedReportUnSolved] = useState(true);
  const [checkedReportBlocked, setCheckedReportBlocked] = useState(false);
  const [checkedReportUnBlocked, setCheckedReportUnBlocked] = useState(true);

  const [resizedBug, setResizedBug] = useState(false)
  const [resizedContact, setResizedContact] = useState(false)
  const [resizedReport, setResizedReport] = useState(false)

  const [bugSize, setBugSize] = useState()
  const [contactSize, setContactSize] = useState()
  const [reportSize, setReportSize] = useState()

  const [amountBug, setAmountBug] = useState();
  const [amountContacts, setAmountContacts] = useState();
  const [amountReports, setAmountReports] = useState();
  const [messageFlowBug, setMessageFlowBug] = useState([]);
  const [messageFlowContacts, setMessageFlowContacts] = useState([]);
  const [messageFlowReports, setMessageFlowReports] = useState([]);

  const [pageBug, setPageBug] = useState(1);
  const [pageContacts, setPageContacts] = useState(1);
  const [pageReports, setPageReports] = useState(1);

  const [baseSize, setBaseSize] = useState()

  const currentUser = getCurrentUser();
  const postPSide = 5


  useEffect(() => {
    const currentUserTemp = getCurrentUser();

    if (currentUserTemp?.rights.includes('READ_BUG_REPORTS') || currentUser?.rights.includes('ADMIN')) {
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

      ManagementService.getBugMessages("unsolved", 0, postPSide).then((response) => {
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
    if (currentUserTemp?.rights.includes('READ_CONTACT_REQUESTS') || currentUser?.rights.includes('ADMIN')) {
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

      ManagementService.getContactMessages("unsolved", 0, postPSide).then((response) => {
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
    if (currentUserTemp?.rights.includes('READ_POST_REPORTS') || currentUser?.rights.includes('ADMIN')) {
      ManagementService.getAmountReportedPosts("unsolved", "unblocked").then((response) => {
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
      ManagementService.getReportMessages("unsolved", "undeleted", 0, postPSide).then((response) => {
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
    }
    if ((currentUserTemp?.rights.includes('READ_POST_REPORTS') && currentUserTemp?.rights.includes('READ_CONTACT_REQUESTS') && currentUserTemp?.rights.includes('READ_BUG_REPORTS')) || currentUser?.rights.includes('ADMIN')) {
      setBaseSize(4)
      setBugSize(4)
      setContactSize(4)
      setReportSize(4)
    } else if ((currentUserTemp?.rights.includes('READ_POST_REPORTS') && currentUserTemp?.rights.includes('READ_CONTACT_REQUESTS')) || (currentUserTemp?.rights.includes('READ_POST_REPORTS') && currentUserTemp?.rights.includes('READ_BUG_REPORTS')) ||
      (currentUserTemp?.rights.includes('READ_BUG_REPORTS') && currentUserTemp?.rights.includes('READ_CONTACT_REQUESTS'))) {
      setBaseSize(6)
      setBugSize(6)
      setContactSize(6)
      setReportSize(6)
    } else {
      setBaseSize(12)
      setBugSize(12)
      setContactSize(12)
      setReportSize(12)
    }
  }, [])

  function createSolveStatus(solved, unsolved) {
    if (solved && unsolved) {
      return "all"
    } else if (solved) {
      return "solved"
    } else {
      return "unsolved"
    }
  }
  function createBlockStatus(blocked, unblocked) {
    if (blocked && unblocked) {
      return "all"
    } else if (blocked) {
      return "blocked"
    } else {
      return "unblocked"
    }
  }

  function getBugReports(status) {
    ManagementService.getAmountPostedBugs(status).then((response) => {
      setAmountBug(Math.ceil(response.data.amount / postPSide));
      if (response.data.amount < ((pageBug - 1) * 5)) {
        ManagementService.getBugMessages(status, 0, postPSide).then((response) => {
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
      } else {
        ManagementService.getBugMessages(status, ((pageBug - 1) * postPSide), postPSide).then((response) => {
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
      if (response.data.amount < ((pageContacts - 1) * 5)) {
        ManagementService.getContactMessages(status, 0, postPSide).then((response) => {
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
      } else {
        ManagementService.getContactMessages(status, ((pageContacts - 1) * postPSide), postPSide).then((response) => {
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
  function getReportPosts(filter, block) {
    ManagementService.getAmountReportedPosts(filter, block).then((response) => {
      setAmountReports(Math.ceil(response.data.amount / postPSide));

      if (response.data.amount < ((pageReports - 1) * 5)) {
        ManagementService.getReportMessages(filter, block, 0, postPSide).then((response) => {
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
      } else {
        ManagementService.getReportMessages(filter, block, ((pageReports - 1) * postPSide), postPSide).then((response) => {
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
      }
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
    getBugReports(createSolveStatus(event.target.checked, checkedBugUnSolved))
  };
  const handleChangeContactSolved = (event) => {
    setCheckedContactSolved(event.target.checked)
    getContactRequests(createSolveStatus(event.target.checked, checkedContactUnSolved))
  };
  const handleChangeReportSolved = (event) => {
    setCheckedReportSolved(event.target.checked)
    getReportPosts(createSolveStatus(event.target.checked, checkedReportUnSolved), createBlockStatus(checkedReportBlocked, checkedReportUnBlocked))
  };
  const handleChangeBugUnSolved = (event) => {
    setCheckedBugUnSolved(event.target.checked)
    getBugReports(createSolveStatus(checkedBugSolved, event.target.checked))
  };
  const handleChangeContactUnSolved = (event) => {
    setCheckedContactUnSolved(event.target.checked)
    getContactRequests(createSolveStatus(checkedContactSolved, event.target.checked))
  };
  const handleChangeReportUnSolved = (event) => {
    setCheckedReportUnSolved(event.target.checked)
    getReportPosts(createSolveStatus(checkedReportSolved, event.target.checked), createBlockStatus(checkedReportBlocked, checkedReportUnBlocked))
  };
  const handleChangeReportBlocked = (event) => {
    setCheckedReportBlocked(event.target.checked)
    getReportPosts(createSolveStatus(checkedReportSolved, checkedReportUnSolved), createBlockStatus(event.target.checked, checkedReportUnBlocked))
  };
  const handleChangeReportUnBlocked = (event) => {
    setCheckedReportUnBlocked(event.target.checked)
    getReportPosts(createSolveStatus(checkedReportSolved, checkedReportUnSolved), createBlockStatus(checkedReportBlocked, event.target.checked))
  };

  const handleResizeBug = () => {
    setResizedContact(!resizedContact)
    setResizedReport(!resizedReport)
    if (bugSize === baseSize) {
      setBugSize(12)
    } else {
      setBugSize(baseSize)
    }
  }
  const handleResizeContact = () => {
    setResizedBug(!resizedBug)
    setResizedReport(!resizedReport)
    if (contactSize === baseSize) {
      setContactSize(12)
    } else {
      setContactSize(baseSize)
    }
  }
  const handleResizeReport = () => {
    setResizedBug(!resizedBug)
    setResizedContact(!resizedContact)
    if (reportSize === baseSize) {
      setReportSize(12)
    } else {
      setReportSize(baseSize)
    }
  }

  const handleChangePageBug = (event, newPage) => {
    setPageBug(newPage)
    ManagementService.getBugMessages(createSolveStatus(checkedBugSolved, checkedBugUnSolved), ((newPage - 1) * postPSide), postPSide).then((response) => {
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
    setPageContacts(newPage)
    ManagementService.getContactMessages(createSolveStatus(checkedContactSolved, checkedContactUnSolved), ((newPage - 1) * postPSide), postPSide).then((response) => {
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
    setPageReports(newPage)
    ManagementService.getReportMessages(createSolveStatus(checkedReportSolved, checkedReportUnSolved), createBlockStatus(checkedReportBlocked, checkedReportUnBlocked), ((newPage - 1) * postPSide), postPSide).then((response) => {
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
  }

  return (
    <div>
      <Grid container spacing={1}>
        {(currentUser?.rights.includes('READ_BUG_REPORTS') || currentUser?.rights.includes('ADMIN')) && (
          <Grid className="management__home__message__container" item sm={bugSize} hidden={resizedBug}>
            <h2>Bug Reports</h2>
            <div>
              {(baseSize !== 12) && (
                <IconButton onClick={handleResizeBug}>
                  <Tooltip title="resize window" aria-label="resize_window">
                    <AspectRatioIcon />
                  </Tooltip>
                </IconButton>
              )}
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
                        status={createSolveStatus(checkedBugSolved, checkedBugUnSolved)}
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
                        status={createSolveStatus(checkedContactSolved, checkedContactUnSolved)}
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
                checked={checkedReportUnBlocked}
                onChange={handleChangeReportUnBlocked}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
          unblocked
            <Checkbox
                checked={checkedReportBlocked}
                onChange={handleChangeReportBlocked}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />

          blocked
          </div>
            <div className="management__home__message__container">
              {messageFlowReports?.length === 0 ? (
                <div className='write__posts'>
                  <h2>No data available</h2>
                </div>
              ) : (
                  <div>
                    {messageFlowReports?.map(item => (
                      <HomeReportedManagement
                        key={item.id}
                        id={item.id}
                        username={item.username}
                        body={item.body}
                        title={item.title}
                        solved={item.solved}
                        blocked={item.blocked}
                        changed={item.changed}
                        date={item.date}
                        statusSolved={createSolveStatus(checkedReportSolved, checkedReportUnSolved)}
                        statusBlocked={createBlockStatus(checkedReportBlocked, checkedReportUnBlocked)}
                      />
                    ))}
                  </div>
                )}
            </div>
            <Grid container justify="center">
              <Pagination
                className="page__number"
                defaultPage={1}
                count={amountReports}
                variant="outlined"
                shape="rounded"
                onChange={handleChangePageReport} />
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  )
}

export default HomeManagement
