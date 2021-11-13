import axios from 'axios';
import { STORAGE_KEY_TOKEN } from '../common/constant';

const baseApi = process.env.REACT_APP_BASE_API_URL;

const client = axios.create({
  baseURL: baseApi,
  timeout: 5000,
});

client.interceptors.request.use(function (config) {
  const token = localStorage.getItem(STORAGE_KEY_TOKEN);

  const headers = config.headers;
  if (headers) {
    headers.Authorization = token ? `Bearer ${token}` : '';
  }

  return config;
});

export default client;
