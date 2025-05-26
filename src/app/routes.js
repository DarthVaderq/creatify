import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    alert("Войдите в аккаунт, чтобы получить доступ.");
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};
export default PrivateRoute;
