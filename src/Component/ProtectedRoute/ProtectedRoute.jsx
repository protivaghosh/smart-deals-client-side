import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { Navigate, useLocation } from 'react-router';

const ProtectedRoute = ({children}) => {
    const {user} = useContext(AuthContext);
    const location = useLocation();
   
if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};


export default ProtectedRoute;