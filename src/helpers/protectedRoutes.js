// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ userInfo, children }) => {
  return userInfo ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
