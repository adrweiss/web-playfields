import axios from '../axios';

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

export const logout = () => {
  localStorage.removeItem("user");
  console.log('successfull logout')
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
