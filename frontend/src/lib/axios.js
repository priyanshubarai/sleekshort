import axios from "axios";

axios.defaults.withCredentials = true;

// const baseURL = import.meta.env.MODE === "development"
//   ? import.meta.env.VITE_DEV_SERVER_URL
//   : import.meta.env.VITE_SERVER_URL;

const apiInstance = axios.create({
  baseURL: "http://localhost:7000",
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

export default apiInstance;