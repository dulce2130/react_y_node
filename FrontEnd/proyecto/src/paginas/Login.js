import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:4000/api/veterinario/login', { email, password });
            const { token, nombre } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify({ email, nombre }));

            const userData = { email, nombre };
            const userLocation = await obtenerUbicacionUsuario();

            await registrarUbicacion(userData.email, userLocation.latitud, userLocation.longitud);

            login(userData, userLocation);

            navigate('/listadoMascotas');
        } catch (error) {
            setError(error.response?.data?.mensaje || 'Error en el servidor');
        }
    };

    const obtenerUbicacionUsuario = () => {
        return new Promise((resolve) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        resolve({
                            latitud: position.coords.latitude,
                            longitud: position.coords.longitude
                        });
                    },
                    () => {
                        resolve({ latitud: null, longitud: null });
                    }
                );
            } else {
                resolve({ latitud: null, longitud: null });
            }
        });
    };

    const registrarUbicacion = async (email, latitud, longitud) => {
        try {
            await axios.post('http://localhost:4000/api/veterinario/registrar-ubicacion', { email, latitud, longitud });
        } catch (error) {
            console.error('Error al registrar la ubicación', error);
        }
    };

    return (
        <div className="contenedor">
            <div className="container text-center container-sm">
                <div className="row align-items-start">
                    <div className="col div">
                        <img className='imge' src="https://media-be.chewy.com/wp-content/uploads/2022/09/27101923/cute-dogs-pomeranian.jpg" alt="Cute dog" />
                    </div>
                    <div className="col">
                        <div className="container-sm divForm">
                            <h1>Login</h1>
                            <form className="row g-3 needs-validation" onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label text">Correo Electrónico:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="exampleFormControlInput1"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputPassword5" className="form-label text">Contraseña:</label>
                                    <input
                                        type="password"
                                        id="inputPassword5"
                                        className="form-control"
                                        aria-describedby="passwordHelpBlock"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <div className="mb-3 divButton">
                                    <button type="submit" className="btn btn-outline-primary">Iniciar Sesión</button>
                                </div>
                                <div id="passwordHelpBlock" className="form-text">
                                    <Link to="/olvide-password" className="link">¿Olvidaste tu contraseña?</Link>
                                    <Link to="/registrar" className="link">Registrarse</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
