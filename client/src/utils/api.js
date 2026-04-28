import axios from 'axios';
import { API_BASE } from './constants';

const ADMIN_TOKEN_KEY = 'admin_token';

const API = axios.create({
  baseURL: API_BASE,
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
