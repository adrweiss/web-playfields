import axios from '../config/axios';
import authHeader from "./auth-header";

const triggerBuild = () => {
  return axios.get("/mgt/build", { headers: authHeader() });
};

const getBuildStatus = () => {
  return axios.get("/mgt/build/status", { headers: authHeader() });
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
    {
      id,
      solvedStatus
    },
    { headers: authHeader(), });
};

const putReportStatus = (id, solvedStatus) => {
  return axios.put("/mgt/report/status",
    {
      id,
      solvedStatus
    },
    { headers: authHeader() });
};

const putReportStatusBlocked = (id, blockedstatus) => {
  return axios.put("/mgt/report/blocked",
    {
      id,
      blockedstatus
    },
    { headers: authHeader() });
};

const putContactStatus = (id, solvedStatus) => {
  return axios.put("/mgt/contact/status",
    {
      id,
      solvedStatus
    },
    { headers: authHeader() });
};

const deleteContact = (id) => {
  return axios.delete("/mgt/contact",
    {
      headers: authHeader(),
      data: { id }
    }
  );
};

const deleteBug = (id) => {
  return axios.delete("/mgt/bug",
    {
      headers: authHeader(),
      data: { id }
    }
  );
};

const ManagementService = {
  triggerBuild,
  getBuildStatus,
  getAmountPostedBugs,
  getAmountReportedPosts,
  getAmountContactMessages,
  getBugMessages,
  getReportMessages,
  getContactMessages,
  putBugStatus,
  putReportStatus,
  putContactStatus,
  putReportStatusBlocked,
  deleteContact,
  deleteBug,
}

export default ManagementService;