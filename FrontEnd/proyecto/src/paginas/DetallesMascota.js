import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const DetallesMascota = () => {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
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

    const handleBack = () => {
        navigate('/listadoMascotas');
    };

    return (
        <div className="contenedor">
            <div className="container text-center container-sm">
                <div className="row align-items-start">
                    <div className="col div">
                        {imagenPreview && (
                            <img className='imge' src={imagenPreview} alt="Imagen de Mascota" />
                        )}
                    </div>

                    <div className="col">
                        <div className="container-sm divForm">
                            <h1>Detalles Mascota</h1>
                            <form className="row g-3 needs-validation">

                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label text">Nombre:</label>
                                    <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} className="form-control" id="nombre" placeholder="Ej.: Max" readOnly />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="propietario" className="form-label text">Propietario:</label>
                                    <input type="text" value={propietario} onChange={e => setPropietario(e.target.value)} className="form-control" id="propietario" placeholder="Ej.: John Doe" readOnly />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="correo" className="form-label text">Correo Electrónico:</label>
                                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" id="correo" placeholder="Ej.: name@example.com" readOnly />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="fecha" className="form-label text">Fecha:</label>
                                    <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} className="form-control" id="fecha" readOnly />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="sintomas" className="form-label text">Síntomas:</label>
                                    <textarea value={sintomas} onChange={e => setSintomas(e.target.value)} className="form-control" id="sintomas" placeholder="Describe los síntomas" readOnly></textarea>
                                </div>
                                <div className="mb-3 divButton">
                                    <button type="button" onClick={handleBack} className="btn btn-outline-secondary">Regresar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetallesMascota;
