import axios from "../axios";
import authHeader from "./auth-header";

const getViewLoginData = () => {
  return axios.delete("/api/view/login",
    { headers: authHeader() });
};

const getViewDeleteData = () => {
  return axios.delete("/api/view/delete",
    { headers: authHeader() });
};

const ManagementUserService = {
  getViewLoginData,
  getViewDeleteData,
}

export default ManagementUserService;