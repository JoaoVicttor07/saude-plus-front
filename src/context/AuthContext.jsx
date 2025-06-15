import React, { createContext, useState, useContext, useEffect } from "react";
import AuthService from "../services/AuthService"; // Seu serviço de autenticação
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Para verificar o token inicial
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AuthProvider useEffect: Verificando token inicial.");
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      console.log(
        "AuthProvider useEffect: Usuário encontrado no token.",
        currentUser
      );
      setUser(currentUser);
      setIsAuthenticated(true);
    } else {
      console.log("AuthProvider useEffect: Nenhum usuário no token.");
    }
    setIsLoading(false); // Define isLoading como false após a verificação inicial
    console.log(
      "AuthProvider useEffect: Verificação inicial concluída, isLoading agora é:",
      false
    );
  }, []);

  const login = async (credentials) => {
    console.log("AuthContext: login iniciado.");
    setIsLoading(true); // Define isLoading para true durante a operação de login
    console.log("AuthContext login: isLoading definido para true.");
    try {
      const data = await AuthService.login(credentials);
      if (data && data.token) {
        const currentUser = AuthService.getCurrentUser();
        setUser(currentUser);
        setIsAuthenticated(true);
        console.log(
          "AuthContext login: Sucesso, usuário definido.",
          currentUser
        );
        // Redirecionamento baseado no papel do usuário
        if (currentUser?.role) {
          const userRole = currentUser.role.toUpperCase();
          if (userRole === "GERENTE") navigate("/admin/dashboard");
          else if (userRole === "MEDICO") navigate("/doctor/dashboard");
          else if (userRole === "PACIENTE") navigate("/dashboard");
          else navigate("/dashboard"); // Fallback
        } else {
          console.warn("AuthContext login: Usuário logado sem campo 'role' no token.");
          navigate("/dashboard"); // Fallback se não houver papel
        }
        setIsLoading(false); // Define isLoading para false após o sucesso
        console.log("AuthContext login: isLoading definido para false.");
        return true;
      }
      // Se data ou data.token for falso, mas não houve erro
      setIsLoading(false);
      console.log(
        "AuthContext login: Resposta de login inválida, isLoading definido para false."
      );
      return false; // Indica que o login não foi bem-sucedido como esperado
    } catch (error) {
      console.error("Falha no login (AuthContext):", error);
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false); // Define isLoading para false em caso de erro
      console.log("AuthContext login: Erro, isLoading definido para false.");
      throw error;
    }
  };

  const signup = async (userData) => {
    console.log("AuthContext: signup iniciado.");
    setIsLoading(true); // Define isLoading para true durante a operação de signup
    console.log("AuthContext signup: isLoading definido para true.");
    try {
      const response = await AuthService.register(userData);
      console.log("AuthContext: AuthService.register sucesso.");
      setIsLoading(false); // Define isLoading para false após o sucesso
      console.log("AuthContext signup: isLoading definido para false.");
      return response || true;
    } catch (error) {
      console.error("Falha no signup (AuthContext):", error);
      setIsLoading(false); // Define isLoading para false em caso de erro
      console.log("AuthContext signup: Erro, isLoading definido para false.");
      throw error;
    }
  };

  const logout = async () => {
    console.log("AuthContext: logout iniciado.");
    // setIsLoading(true); // Opcional: definir isLoading para true durante o logout
    await AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
    // setIsLoading(false); // Opcional: definir isLoading para false após o logout
    console.log("AuthContext: Usuário deslogado.");
    navigate("/signin");
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    setUser, // Expondo setUser pode ser útil para atualizar perfil, etc.
    setIsAuthenticated, // Pode ser útil em cenários específicos
  };

  // SIMPLIFICAÇÃO AQUI: Sempre renderiza os children.
  // O isLoading do AuthContext ainda pode ser usado pelos componentes (ex: botões)
  // para mostrar um estado de carregamento, mas não vai mais desmontar a árvore de componentes.
  // O useEffect inicial ainda usa isLoading para o carregamento do token na primeira vez.
  // Se você quiser um indicador de carregamento global para a verificação inicial do token,
  // você pode lidar com isso de forma diferente (ex: um spinner no App.jsx que verifica o isLoading do AuthContext).

  // Se o carregamento inicial do token ainda não terminou, pode-se mostrar um loader global.

  // Se o carregamento inicial do token ainda não terminou, pode-se mostrar um loader global.
  // if (isLoading && !user && !AuthService.getToken()) {
  //   // Condição mais específica para o loader inicial
  //   console.log(
  //     "AuthProvider: Carregamento inicial do token, mostrando loader global."
  //   );
  //   return <div>Carregando aplicação...</div>; // Ou um componente de Spinner global
  // }

  console.log(
    "AuthProvider: Renderizando children. isLoading:",
    isLoading,
    "isAuthenticated:",
    isAuthenticated
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook customizado para usar o AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
