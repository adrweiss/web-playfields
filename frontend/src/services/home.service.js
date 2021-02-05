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

// delete post any 
const HomeService = {
  getAmount,
  getPosts,
  getDescriptions,
  addPostAny,
  addPostUser,
  deletePostAny,
  deletePostUser,
  editPostAny,
  editPostUser,
  reportPost,
}

export default HomeService;