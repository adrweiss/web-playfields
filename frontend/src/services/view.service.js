import axios from "../axios";
import authHeader from "./auth-header";

const getViewLoginData = () => {
  return axios.get("/view/login",
    { headers: authHeader() });
};

const getViewDeleteData = () => {
  return axios.get("/view/delete",
    { headers: authHeader() });
};

const ViewService = {
  getViewLoginData,
  getViewDeleteData,
}

export default ViewService;