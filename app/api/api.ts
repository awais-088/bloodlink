import axios from "axios";

const API = axios.create({
  baseURL: "http://10.11.243.76:5000/api",
});

export default API;