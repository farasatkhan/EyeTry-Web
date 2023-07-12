import axios from 'axios';

const API_BASE_URL = 'http://your-api-base-url.com';

const accessToken = localStorage.getItem('accessToken');

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});

export default axiosInstance;