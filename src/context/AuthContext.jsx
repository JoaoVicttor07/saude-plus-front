import React, { createContext, useState, useContext, useEffect } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import GlobalSpinner from "../components/GlobalSpinner";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOperationLoading, setIsOperationLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    setIsInitialLoading(false);
  }, []);

  const login = async (credentials) => {
    setIsOperationLoading(true);
    try {
      const data = await AuthService.login(credentials);
      if (data && data.token) {
        const currentUser = AuthService.getCurrentUser();
        setUser(currentUser);
        setIsAuthenticated(true);

        if (currentUser?.role) {
          const userRole = currentUser.role.toUpperCase();
          if (userRole === "GERENTE") navigate("/admin/dashboard");
          else if (userRole === "MEDICO") navigate("/doctor/dashboard");
          else if (userRole === "PACIENTE") navigate("/dashboard");
          else navigate("/dashboard");
        } else {
          console.warn(
            "AuthContext login: Usuário logado sem campo 'role' no token."
          );
          navigate("/dashboard");
        }
        setIsOperationLoading(false);
        return true;
      }

      setIsOperationLoading(false);
      return false;
    } catch (error) {
      console.error("Falha no login (AuthContext):", error);
      setIsAuthenticated(false);
      setUser(null);
      setIsOperationLoading(false);
      throw error;
    }
  };

  const signup = async (userData) => {
    setIsOperationLoading(true);
    try {
      const response = await AuthService.register(userData);
      setIsOperationLoading(false);
      return response || true;
    } catch (error) {
      console.error("Falha no signup (AuthContext):", error);
      setIsOperationLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
    navigate("/signin");
  };

  const updateUserContext = (newUserData) => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading: isOperationLoading,
    isInitialLoading,
    login,
    signup,
    logout,
    updateUserContext,
    // setUser,
    // setIsAuthenticated,
  };

  if (isInitialLoading) {
    return <GlobalSpinner />;
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook customizado para usar o AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
