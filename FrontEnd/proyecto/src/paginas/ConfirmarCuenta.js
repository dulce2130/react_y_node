import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {

    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState({});
    const [alertType, setAlertType] = useState(null);

    const params = useParams();
    const { id } = params;

    useEffect(() => {

        const confirmarCuenta = async () => {
            try {
                const url = `http://localhost:4000/api/veterinario/confirmar/${id}`;
                const { data } = await axios(url);

                setCuentaConfirmada(true);
                setAlertType("success");

                setAlerta({
                    mensaje: data.mensaje,
                    error: false
                });

                setTimeout(() => {
                    setCuentaConfirmada(false);
                }, 300000);

            } catch (error) {
                console.log(error.response);
                setAlertType("error");

                setAlerta({
                    mensaje: error.response.data.mensaje,
                    error: true
                });
            }
            setCargando(false);
        };

        confirmarCuenta();

    }, [id]);

    return (
        <div className="contenedor">
            {!cargando && (
                <Alerta alerta={alerta} />
            )}

            {!cargando && alertType === "error" && (
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">¡Error!</h4>
                    <p>{alerta.mensaje}</p>
                    <hr />
                    <p className="mb-0">Inténtalo de nuevo.</p>
                    <img className="gif" src="https://j.gifs.com/ygdY27.gif" alt="Error" />
                </div>
            )}

            {!cargando && alertType === "success" && cuentaConfirmada && (
                <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading">¡Excelente!</h4>
                    <p>{alerta.mensaje}</p>
                    <hr />
                    <p className="mb-0">Gracias por confirmar su correo.</p>
                    <div className="direccionColumn">
                        <img className="gif" src='https://media2.giphy.com/media/bYQPR1vYzS2upGthb0/giphy.gif?cid=6c09b952vh8jfh43ma6rc0dv5a10d5qmdt2r7bwm9bclc7pp&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s' alt="Confirmación exitosa" />
                        <Link to="/" className="btn btn-primary mt-3">Ir a Inicio de Sesión</Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ConfirmarCuenta;
