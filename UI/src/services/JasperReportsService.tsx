import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_JASPERSERVER_URL,
  responseType: "json",
  withCredentials: true
});