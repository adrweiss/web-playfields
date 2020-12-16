import axios from "../axios";
import authHeader from "./auth-header";

const getRolesRights = () => {
  return axios.get("/usr/rights", { headers: authHeader() });
};

export default { 
  getRolesRights,
};