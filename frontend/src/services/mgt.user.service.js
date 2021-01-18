import axios from '../config/axios';
import authHeader from "./auth-header";

const getUserInfos = () => {
  return axios.get("/mgt/user", { headers: authHeader() });
};

const deleteUsr = (userId) => {
  return axios.delete("/mgt/user", { headers: authHeader(), data: { "userId": userId } })
};

const blockUsr = (userId, blocked) => {
  return axios.put("/mgt/user",
    {
      "userId": userId,
      "blocked": blocked
    },
    { headers: authHeader() });
};

const changePwFromUser = (userId, newPassword) => {
  return axios.put("/mgt/user/chgpw",
    {
      "userId": userId,
      "pwd": newPassword
    },
    { headers: authHeader() });
};

const changeRoleFromUser = (userId, func, role) => {
  return axios.put("/mgt/user/role",
    {
      "userId": userId,
      "function": func,
      "role": role
    },
    { headers: authHeader() });
};

const validUsr = (userId) => {
  return axios.put("/mgt/user/valid",
    {
      "userId": userId,
    },
    { headers: authHeader() });
};

const ManagementUserService = {
  getUserInfos,
  deleteUsr,
  blockUsr,
  changePwFromUser,
  changeRoleFromUser,
  validUsr,
}

export default ManagementUserService;