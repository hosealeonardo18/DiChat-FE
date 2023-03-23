import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const isLogin = localStorage.getItem('token');

  if (!isLogin) {
    return <Navigate to="/login" replace="true" />;
  }

  return children;
};

export default RequireAuth;
