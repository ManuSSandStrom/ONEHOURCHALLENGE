import axios from 'axios';

const ADMIN_TOKEN_KEY = 'ohc_admin_token';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://onehourchallenge.onrender.com/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  if (token && config.url?.startsWith('/admin')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const adminSession = {
  key: ADMIN_TOKEN_KEY,
  getToken: () => localStorage.getItem(ADMIN_TOKEN_KEY),
  setToken: (token) => localStorage.setItem(ADMIN_TOKEN_KEY, token),
  clear: () => localStorage.removeItem(ADMIN_TOKEN_KEY),
};

export default API;
