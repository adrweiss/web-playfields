import axios from "../axios";
import authHeader from "./auth-header";

const getRoles = () => {
  return axios.get("/mgt/role", { headers: authHeader() });
};

const getRights = () => {
  return axios.get("/mgt/right", { headers: authHeader() });
};


const createRole = (name, description, rights) => {
  return axios.post("/mgt/role",
    {
      "name": name,
      "description": description,
      "rights": rights
    }, { headers: authHeader() });
};

const editRole = (id, name, description, rights) => {
  return axios.put("/mgt/role", {
    "id": id,
    "name": name,
    "description": description,
    "rights": rights
  }, { headers: authHeader() });
};

const deleteRole = (id) => {
  return axios.delete("/mgt/role", { headers: authHeader() , data: { "id": id }});
};

const ManagementRoleService = {
  getRoles,
  getRights,
  createRole,
  editRole,
  deleteRole,
}

export default ManagementRoleService;