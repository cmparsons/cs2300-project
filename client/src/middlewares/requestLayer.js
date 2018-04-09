import axios from 'axios';
import stores from '../stores';

axios.interceptors.request.use(
  (config) => {
    const { token } = stores.authStore;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 401) {
      stores.authStore.logout();
    }

    return Promise.reject(error);
  },
);

export default class RequestLayer {
  getCurrentUser = async () => {
    try {
      const response = await axios.get('/api/users/me');
      return response.data.user;
    } catch (err) {
      throw err;
    }
  };
}