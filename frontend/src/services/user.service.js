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
  console.log(username)
  return axios.put("/usr/mgt/chgUN",
    { username },
    { headers: authHeader() })
};

const UserService = {
  getRolesRights,
  deleteUsr,
  changePassword,
  changeUsername,
  getRights
}

export default UserService;