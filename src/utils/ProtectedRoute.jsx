import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Carregando autenticação...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (allowedRoles && !user?.role) {
    console.warn(
      "ProtectedRoute: Usuário autenticado mas sem o campo 'role' válido para verificação de papel."
    );
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  const userRole = user?.role?.toUpperCase();

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

  return <Outlet />;
};

export default ProtectedRoute;
