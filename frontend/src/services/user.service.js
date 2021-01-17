import axios from '../config/axios';
import authHeader from "./auth-header";

const getRolesRights = () => {
  return axios.get("/usr/roles", { headers: authHeader() });
};

const getRights = () => {
  return axios.get("/usr/rights", { headers: authHeader() });
};

const deleteUsr = () => {
  return axios.delete("/usr/mgt", { headers: authHeader() });
};

const changePassword = (password, password_new) => {
  return axios.put("/usr/mgt/chgPW",
    {
      password,
      password_new
    },
    {
      headers: authHeader()
    })
};

const changeUsername = (username) => {
  return axios.put("/usr/mgt/chgUN",
    { username },
    { headers: authHeader() })
};

const resetPassword = (email) => {
  return axios.post("/usr/resetpw",
    { email })
};

const setPassword = (key, password) => {
  return axios.post("/usr/setforgottpw",
    {
      key,
      password
    })
};

const UserService = {
  getRolesRights,
  deleteUsr,
  changePassword,
  changeUsername,
  getRights,
  resetPassword,
  setPassword,
}

export default UserService;