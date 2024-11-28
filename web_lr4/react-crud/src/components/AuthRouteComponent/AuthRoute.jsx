import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext';

function AuthRoute({ element: Component, redirectTo = "/", ...rest }) {
    const { isAuthenticated } = useContext(AuthContext);
    const location = useLocation();
    if (!isAuthenticated) {
        return <Component {...rest} />;
    }
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
}

export default AuthRoute;