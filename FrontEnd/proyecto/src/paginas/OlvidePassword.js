import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const OlvidePassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const { token: urlToken } = useParams();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:4000/api/veterinario/password', { email });
            setMessage(data.mensaje);
            setStep(2);
        } catch (error) {
            setMessage(error.response?.data?.mensaje || 'Error en el servidor');
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Las contraseñas no coinciden');
            return;
        }

        try {
            const { data } = await axios.post(`http://localhost:4000/api/veterinario/password/${token}`, { password });
            setMessage(data.mensaje);
            setStep(4); // Ir al paso final después de actualizar la contraseña
        } catch (error) {
            setMessage(error.response?.data?.mensaje || 'Error en el servidor');
        }
    };

    useEffect(() => {
        const comprobarToken = async () => {
            if (urlToken) {
                try {
                    console.log('Verificando token:', urlToken);
                    const { data } = await axios.get(`http://localhost:4000/api/veterinario/password/${urlToken}`);
                    console.log('Token válido:', data);
                    setMessage(data.mensaje);
                    setToken(urlToken);
                    setStep(3);
                } catch (error) {
                    console.error('Error verificando token:', error);
                    setMessage(error.response?.data?.mensaje || 'Error en el servidor');
                    setStep(1);
                }
            }
            setLoading(false);
        };

        comprobarToken();
    }, [urlToken]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="container-sm divForm">
            <h1>Restablecer Contraseña</h1>
            {step === 1 && (
                <form onSubmit={handleEmailSubmit} className="row g-3 needs-validation">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo Electrónico:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3 divButton">
                        <button type="submit" className="btn btn-outline-primary">Solicitar Restablecimiento</button>
                    </div>
                </form>
            )}

            {step === 2 && (
                <div>
                    <p>{message}</p>
                </div>
            )}

            {step === 3 && (
                <form onSubmit={handlePasswordSubmit} className="row g-3 needs-validation">
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">Nueva Contraseña:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="newPassword"
                            placeholder="Ingrese su nueva contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            placeholder="Confirme su nueva contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3 divButton">
                        <button type="submit" className="btn btn-outline-primary">Guardar Contraseña</button>
                    </div>
                </form>
            )}

            {step === 4 && (
                <div className='contenedor'>
                    <p>{message}</p>
                    <Link to="/" className="btn btn-outline-primary mt-3">Ir a Inicio de Sesión</Link>
                </div>
            )}

            {message && step !== 2 && step !== 4 && <p>{message}</p>}
        </div>
    );
};

export default OlvidePassword;
