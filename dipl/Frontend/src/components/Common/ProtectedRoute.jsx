import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../pages/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { auth } = useAuth();

    console.log('ProtectedRoute auth state:', auth);

    if (!auth.token) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
