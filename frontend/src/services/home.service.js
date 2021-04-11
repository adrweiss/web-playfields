import axios from '../config/axios';
import authHeader from "./auth-header";

const getAmount = () => {
  return axios.get("/home/posts");
};

const getPosts = (skip, limit) => {
  return axios.get("/home/post",
    { params: { "skip": skip, "limit": limit } }
  );
};

const getDescriptions = () => {
  return axios.get("/home/desc");
};

const reportPost = (postId) => {
  return axios.post("/home/report", {postId} );
};

const addPostAny = (title, body) => {
  return axios.post("/home/post/any",
    {
      title,
      body
    }
  );
};

const addPostUser = (title, body) => {
  return axios.post("/home/post/user",
    {
      title,
      body
    }, { headers: authHeader() }
  );
};

const deletePostAny = (postId) => {
  return axios.delete("/home/post/any", { headers: authHeader(), data: { "postId": postId } });
};

const deletePostUser = (postId) => {
  return axios.delete("/home/post/user", { headers: authHeader(), data: { "postId": postId } });
};

const editPostAny = (postId, title, body) => {
  return axios.put("/home/post/any", {
    postId,
    title,
    body
  }, { headers: authHeader() });
};

const editPostUser = (postId, title, body) => {
  return axios.put("/home/post/user", {
    postId,
    title,
    body
  }, { headers: authHeader() });
};

const getAllDescriptions = () => {
  return axios.get("/home/desc/all", { headers: authHeader() });
};

const deleteDescription = (descId) => {
  return axios.delete("/home/desc", { headers: authHeader(), data: { descId } });
};

const setStatusVisibleDesc = (descId, status) => {
  return axios.put("/home/desc/status", {
    descId,
    status
  }, { headers: authHeader() });
};

const editDescription = (descId, title, body) => {
  return axios.put("/home/desc", {
    descId,
    title,
    body
  }, { headers: authHeader() });
};

const addDescription = (title, body, serial_number, visible) => {    
  return axios.post("/home/desc", {    
    title,
    body,
    serial_number, 
    visible
  }, { headers: authHeader() });
};


const setPosition = (descIdUp, descIdDown) => {
  return axios.put("home/desc/position", {
    descIdUp,
    descIdDown,
  }, { headers: authHeader() });
};


const HomeService = {
  getAmount,
  getPosts,
  getDescriptions,
  addPostAny,
  addPostUser,
  addDescription,
  deletePostAny,
  deletePostUser,
  deleteDescription,
  editPostAny,
  editPostUser,
  editDescription,
  reportPost,
  getAllDescriptions,
  setStatusVisibleDesc,
  setPosition,
}

export default HomeService;