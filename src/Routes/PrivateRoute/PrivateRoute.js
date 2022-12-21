import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, loader } = useContext(AuthContext)
    const location = useLocation()
    if (loader) {
        return <progress className="progress w-56"></progress>
    }
    if (user) {
        return children
    }

    return <Navigate to='/login' state={{ from: location }} replace ></Navigate>

};

export default PrivateRoute;