import axios from '../config/axios';

export const register = (username, email, password) => {
  return axios.post("auth/signup", {
    username,
    email,
    password,
  });
};

export const login = (identifier, password) => {
  return axios
    .post("auth/signin", {
      identifier,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

export const validate = (userId, token) => {
  return axios.post("auth/validate", {
    userId,
    token,
  });
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("newDesc");
  console.log('successfull logout')
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const getTempDescription = () => {
  return JSON.parse(localStorage.getItem("newDesc"));
};

  
