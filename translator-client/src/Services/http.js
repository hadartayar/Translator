// external lib 
import axios from "axios";

const service = {
  get: axios.get,
  post: axios.post,
  delete: axios.delete
};

export default service;