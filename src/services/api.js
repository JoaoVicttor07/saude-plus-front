import axios from "axios";
import AuthService from './AuthService';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken(); // Pega o token do AuthService
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401 && !error.config._retry) {
      error.config._retry = true;
      console.warn('API Interceptor: Sessão expirada ou token inválido. Deslogando...');
      AuthService.logout(); 
    }
    return Promise.reject(error);
  }
);

export default api;