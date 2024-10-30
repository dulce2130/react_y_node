import { useState, useEffect } from "react";
import Alerta from "../components/Alerta.js";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ModificarMascota = () => {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [imagen, setImagen] = useState(null);
    const [imagenPreview, setImagenPreview] = useState(null);
    const [alerta, setAlerta] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerMascota = async () => {
            try {
                const { data } = await axios.get(`http://localhost:4000/api/mascota/${id}`);
                setNombre(data.nombre);
                setPropietario(data.propietario);
                setEmail(data.email);
                setFecha(new Date(data.fecha).toISOString().split('T')[0]);
                setSintomas(data.sintomas);
                setImagenPreview(data.imagen ? `http://localhost:4000/uploads/${data.imagen}` : null);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerMascota();
    }, [id]);

    const handleSubmit = async e => {
        e.preventDefault();

        if ([nombre, propietario, email, fecha, sintomas].includes('')) {
            console.log("Hay campos vacios");
            setAlerta({
                mensaje: "Hay campos vacios",
                error: true
            });
            return;
        }

        setAlerta({});

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('propietario', propietario);
        formData.append('email', email);
        formData.append('fecha', fecha);
        formData.append('sintomas', sintomas);
        if (imagen) {
            formData.append('imagen', imagen);
        }

        try {
            const url = `http://localhost:4000/api/mascota/modificarMascota/${id}`;
            await axios.put(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setAlerta({
                mensaje: 'Mascota modificada correctamente',
                error: false
            });
            navigate('/listadoMascotas');
        } catch (error) {
            console.log(error.response);
            setAlerta({
                mensaje: error.response.data.mensaje,
                error: true
            });
        }
    };

    const handleBack = () => {
        navigate('/listadoMascotas');
    };

    return (
        <>
            <div className="container text-center container-sm">
                <div className="row align-items-start">
                    <div className="col div">
                        {imagenPreview && (
                            <img className='imge' src={imagenPreview} alt="Imagen de Mascota" />
                        )}
                    </div>

                    <div className="col">
                        <div className="container-sm divForm">
                            <h1>Modificar Mascota</h1>
                            <form className="row g-3 needs-validation" onSubmit={handleSubmit}>
                                <Alerta alerta={alerta} />

                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label text">Nombre:</label>
                                    <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} className="form-control" id="nombre" placeholder="Ej.: Max" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="propietario" className="form-label text">Propietario:</label>
                                    <input type="text" value={propietario} onChange={e => setPropietario(e.target.value)} className="form-control" id="propietario" placeholder="Ej.: John Doe" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="correo" className="form-label text">Correo Electrónico:</label>
                                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" id="correo" placeholder="Ej.: name@example.com" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="fecha" className="form-label text">Fecha:</label>
                                    <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} className="form-control" id="fecha" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="sintomas" className="form-label text">Síntomas:</label>
                                    <textarea value={sintomas} onChange={e => setSintomas(e.target.value)} className="form-control" id="sintomas" placeholder="Describe los síntomas"></textarea>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="imagen" className="form-label text">Imagen:</label>
                                    <input type="file" onChange={e => setImagen(e.target.files[0])} className="form-control" id="imagen" />
                                </div>

                                <div className="mb-3 divButton">
                                    <button type="button" onClick={handleBack} className="btn btn-outline-secondary">Regresar</button>
                                    <button type="submit" className="btn btn-outline-primary">Modificar Mascota</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModificarMascota;
