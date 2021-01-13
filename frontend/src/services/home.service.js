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

const deletePostAny = (postId) => {
  return axios.delete("/home/post/any", { headers: authHeader() , data: { "postId": postId }});
};

const deletePostUser = (postId) => {
  return axios.delete("/home/post/user",{ headers: authHeader() , data: { "postId": postId }});
};


// delete post any 
const HomeService = {
  getAmount,
  getPosts,
  addPostAny,
  addPostUser,
  deletePostAny,
  deletePostUser
}

export default HomeService;