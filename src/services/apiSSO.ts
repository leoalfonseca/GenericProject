import { storageGetToken, storageRemoveToken } from 'storage/storageToken';
import axios from 'axios';

const apiSSO = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
  timeout: 50000,
});

apiSSO.interceptors.request.use(async (config) => {
  const token = storageGetToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiSSO.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      await storageRemoveToken();
      window.location.replace('/');
    }

    return Promise.reject(error);
  }
);

export { apiSSO };
