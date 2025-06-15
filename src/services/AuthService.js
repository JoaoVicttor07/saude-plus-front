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

  logout: async () => {
    const token = AuthService.getToken();
    localStorage.removeItem('userToken');
    if (token) {
      try {
        await api.post('/auth/logout');
        console.log('Logout realizado com sucesso na API.');
      } catch (error) {
        console.error('Erro ao fazer logout na API (token já removido localmente):', error.response ? error.response.data : error.message);
      }
    }
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('userToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        return {
          id: decodedToken.sub,
          email: decodedToken.email,
          role: decodedToken.role,
        };
      } catch (error) {
        console.error('Token inválido ou expirado ao tentar decodificar:', error);
        AuthService.logout();
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
        return decodedToken.exp * 1000 > Date.now();
      } catch (error) {
        return false;
      }
    }
    return false;
  }
};

export default AuthService;
