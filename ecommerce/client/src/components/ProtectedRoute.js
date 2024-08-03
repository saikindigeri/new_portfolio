// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext'; 

const ProtectedRoute = ({ element, ...rest }) => {
 
    const isAuthenticated = Cookies.get('token');

  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

 
  return element;
};

export default ProtectedRoute;