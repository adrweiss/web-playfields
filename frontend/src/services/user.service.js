import axios from "../axios";
import authHeader from "./auth-header";

const getPublicContent = () => {
  return axios.get("test/all");
};

const getUserBoard = () => {
  return axios.get("test/user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get("test/mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get("test/admin", { headers: authHeader() });
};

/*const getRolesRights = () => {
  return axios.get("/usr/rights", { headers: authHeader() });
};*/

export default { 
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};