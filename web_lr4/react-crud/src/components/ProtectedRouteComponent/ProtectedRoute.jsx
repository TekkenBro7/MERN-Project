import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext';

const ProtectedRoute = ({ element: Component, redirectTo = "/login", ...rest }) => {
    const { isAuthenticated, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <div>Загрузка...</div>;
    }
    return isAuthenticated ? (
        <Component {...rest} />
    ) : (
        <Navigate to={redirectTo} state={{ from: location }} replace />
    );
};

export default ProtectedRoute;
