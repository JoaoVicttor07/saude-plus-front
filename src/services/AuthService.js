import api from "./api";
import { jwtDecode } from 'jwt-decode';

const AuthService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data && response.data.token) {
        localStorage.setItem('userToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Erro no login:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/pacientes', userData);
      return response.data;
    } catch (error) {
      console.error('Erro no cadastro:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('userToken');
    // Adicione qualquer outra lógica de limpeza de logout aqui (ex: redirecionar para login)
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('userToken');
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.error('Token inválido ou expirado:', error);
        AuthService.logout(); // Faz logout se o token for inválido
        return null;
      }
    }
    return null;
  },

  getToken: () => {
    return localStorage.getItem('userToken');
  },

  isAuthenticated: () => {
    const token = AuthService.getToken();
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // Verifica se o token não expirou
        if (decodedToken.exp * 1000 > Date.now()) {
          return true;
        }
      } catch (error) {
        // Se houver erro na decodificação, o token é inválido
        return false;
      }
    }
    return false;
  }
};

// Adicionar interceptor para incluir o token JWT em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Opcional: Interceptor de resposta para lidar com erros 401 (Não Autorizado)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      AuthService.logout();
      console.warn('Sessão expirada ou token inválido. Usuário deslogado.');
    }
    return Promise.reject(error);
  }
);

export default AuthService;