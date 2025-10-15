import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedUser = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  if (!user || user.role !== "2") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedUser;