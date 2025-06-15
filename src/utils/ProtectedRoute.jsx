import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Você pode retornar um spinner ou um componente de carregamento aqui
    return <div>Carregando autenticação...</div>;
  }

  if (!isAuthenticated) {
    // Redireciona para a página de login, guardando a localização atual
    // para que o usuário possa ser redirecionado de volta após o login.
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (allowedRoles && !user?.role) {
    console.warn(
      "ProtectedRoute: Usuário autenticado mas sem o campo 'role' válido para verificação de papel."
    );
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // Modificado: Extrair o papel de user.role
  const userRole = user?.role?.toUpperCase();

  // Se a rota requer papéis específicos e o papel do usuário não está entre os permitidos
  if (
    allowedRoles &&
    !allowedRoles.map((role) => role.toUpperCase()).includes(userRole)
  ) {
    console.warn(
      `ProtectedRoute: Acesso negado. Usuário com papel '${userRole}' tentou acessar rota para '${allowedRoles.join(
        ", "
      )}'.`
    );
    return <Navigate to="/signin" state={{ from: location }} replace />; // Ou para uma página de erro/dashboard
  }

  // Se autenticado e (não há papéis específicos OU o papel do usuário é permitido)
  // Renderiza o componente filho (Outlet lida com rotas aninhadas se houver)
  return <Outlet />;
};

export default ProtectedRoute;
