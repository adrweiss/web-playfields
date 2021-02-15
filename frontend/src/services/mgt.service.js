import axios from '../config/axios';
import authHeader from "./auth-header";

const triggerBuild = () => {
  return axios.get("/mgt/build", { headers: authHeader() });
};

const getAmountPostedBugs = (filter) => {
  return axios.get("/mgt/bug/amount",  
  { headers: authHeader(), params: { "filter": filter} });
};

const getAmountReportedPosts = (filter, deleted) => { 
  return axios.get("/mgt/report/amount", 
  { headers: authHeader(), params: { "filter": filter, "deleted": deleted} });
 };

const getAmountContactMessages = (filter) => { 
  return axios.get("/mgt/contact/amount", 
  { headers: authHeader(), params: { "filter": filter} });
};

const getBugMessages = (filter, skip, limit) => { 
  return axios.get("/mgt/bug/messages", 
  { headers: authHeader(), params: { "filter": filter, "skip": skip, "limit": limit} });
};

const getReportMessages = (filter, deleted, skip, limit) => { 
  return axios.get("/mgt/report/messages", 
  { headers: authHeader(), params: { "filter": filter, "deleted": deleted, "skip": skip, "limit": limit} });
};

const getContactMessages = (filter, skip, limit) => { 
  return axios.get("/mgt/contact/messages", 
  { headers: authHeader(), params: { "filter": filter, "skip": skip, "limit": limit} });
};


const ManagementService = {
  triggerBuild,
  getAmountPostedBugs,
  getAmountReportedPosts,
  getAmountContactMessages,
  getBugMessages,
  getReportMessages,
  getContactMessages, 
}

export default ManagementService;