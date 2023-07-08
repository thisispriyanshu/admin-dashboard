import axios from "axios";

const site = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export default site;
