import axios from '../config/axios';
import authHeader from "./auth-header";

const triggerBuild = () => {
  return axios.get("/mgt/build", { headers: authHeader() });
};

const getAmountPostedBugs = (filter) => {
  return axios.get("/mgt/bug/amount",
    { headers: authHeader(), params: { "filter": filter } });
};

const getAmountReportedPosts = (filter, blocked) => {
  return axios.get("/mgt/report/amount",
    { headers: authHeader(), params: { "filter": filter, "blocked": blocked } });
};

const getAmountContactMessages = (filter) => {
  return axios.get("/mgt/contact/amount",
    { headers: authHeader(), params: { "filter": filter } });
};

const getBugMessages = (filter, skip, limit) => {
  return axios.get("/mgt/bug/messages",
    { headers: authHeader(), params: { "filter": filter, "skip": skip, "limit": limit } });
};

const getReportMessages = (filter, blocked, skip, limit) => {
  return axios.get("/mgt/report/messages",
    { headers: authHeader(), params: { "filter": filter, "blocked": blocked, "skip": skip, "limit": limit } });
};

const getContactMessages = (filter, skip, limit) => {
  return axios.get("/mgt/contact/messages",
    { headers: authHeader(), params: { "filter": filter, "skip": skip, "limit": limit } });
};

const putBugStatus = (id, solvedStatus) => {
  return axios.put("/mgt/bug/status",
    { id,
      solvedStatus },
    { headers: authHeader(), });
};

const putReportStatus = (id, solvedStatus) => {
  return axios.put("/mgt/report/status",
    { id, 
      solvedStatus },
    { headers: authHeader() });
};

const putContactStatus = (id, solvedStatus) => {
  return axios.put("/mgt/contact/status",
    { id,
      solvedStatus },
    { headers: authHeader() });
};


const ManagementService = {
  triggerBuild,
  getAmountPostedBugs,
  getAmountReportedPosts,
  getAmountContactMessages,
  getBugMessages,
  getReportMessages,
  getContactMessages,
  putBugStatus,
  putReportStatus,
  putContactStatus
}

export default ManagementService;