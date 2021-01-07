import axios from '../config/axios';
import authHeader from "./auth-header";

const getAmount = () => {
  return axios.get("/home/posts");
};

const getPosts = (skip, limit) => {
  console.log(limit)
  return axios.get("/home/post",
    { params: { "skip": skip, "limit": limit } }

  );
};


const HomeService = {
  getAmount,
  getPosts,
}

export default HomeService;