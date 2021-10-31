import axios from 'axios';

const baseApi = process.env.REACT_APP_BASE_API_URL;

const client = axios.create({
  baseURL: baseApi,
  timeout: 5000,
});

export default client;
