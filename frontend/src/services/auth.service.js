import axios from '../axios';
import authHeader from "./auth-header";


export const register = (username, email, password) => {
  return axios.post("auth/signup", {
    username,
    email,
    password,
  });
};

export const login = (username, password) => {
  return axios
    .post("auth/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};
/*
export const getRights = () => {
  return axios.get("auth/right", { headers: authHeader() })
}
*/

export const logout = () => {
  localStorage.removeItem("user");
  console.log('successfull logout')
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
