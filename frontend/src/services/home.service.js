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

// delete post user 
// delete post any 
const HomeService = {
  getAmount,
  getPosts,
  addPostAny,
  addPostUser,
}

export default HomeService;