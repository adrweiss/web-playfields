import axios from '../config/axios';
import authHeader from "./auth-header";

const triggerBuild = () => {
  return axios.get("/mgt/build", { headers: authHeader() });
};

const ManagementService = {
  triggerBuild,
}

export default ManagementService;