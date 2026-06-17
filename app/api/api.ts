import axios from "axios";

const API = axios.create({
  baseURL: "https://bloodlink-1n2b.onrender.com/api",
});

export default API;
