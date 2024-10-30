import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = JSON.parse(localStorage.getItem('user'));

        if (token && userData) {
            setUser(userData);

            const verifyToken = async () => {
                try {
                    const response = await axios.get('http://localhost:4000/api/veterinario/perfil', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error('Error al verificar el token:', error);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            };

            verifyToken();
        }
    }, []);

    const login = (userData, userLocation) => {
        setUser(userData);
        setLocation(userLocation);
    };

    const logout = () => {
        setUser(null);
        setLocation(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, location, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
