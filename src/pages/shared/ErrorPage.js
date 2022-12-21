import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const ErrorPage = () => {
    const error = useRouteError()
    const { logout } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLogOut = () => {
        logout()
            .then(() => {
                navigate('/login');
            })
            .catch(err => console.log(err));
    }
    return (
        <div>
            <p className='text-red-500'>Something went wrong!!!</p>
            <p className='text-red-400'>{error.statusText || error.message}</p>
            <h4 className="text-3xl"> Please <button className='btn btn-link text-3xl' onClick={handleLogOut}>Sign out</button> and log back in</h4>
        </div>
    );
};

export default ErrorPage;