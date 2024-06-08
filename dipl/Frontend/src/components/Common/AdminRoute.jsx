import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../pages/AuthContext';

const AdminRoute = ({ children }) => {
    const { auth } = useAuth();


    if (!auth.token || !auth.isAdmin) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default AdminRoute;
