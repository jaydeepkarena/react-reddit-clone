import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/',
  timeout: 2000
});

export default API;
