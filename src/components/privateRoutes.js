import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../Contexts/AuthContext';
import Login from '../pages/Auth/Login'

export default function PrivateRoutes({ Component, allowedRoles }) {
    const { state } = useAuthContext();

    if (!state.isAuthenticated) return <Login />

    if (allowedRoles && !allowedRoles.includes(state.user.role)) {
        return <Navigate to='/' />;
    }

    return <Component />;
}
