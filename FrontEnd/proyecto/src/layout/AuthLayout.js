import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 

const AuthLayout = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            {user ? (
                <div>
                    {/* <p>Bienvenido, {user.email}</p> */}
                    <Outlet />
                </div>
            ) : (
                <div>
                    {/* <p>Por favor, inicia sesión.</p> */}
                    <Outlet />
                </div>
            )}
        </div>
    );
};

export default AuthLayout;
