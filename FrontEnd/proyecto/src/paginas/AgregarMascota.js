import { useState,  } from "react";
import Alerta from "../components/Alerta.js";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const AgregarMascota = () => {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [imagen, setImagen] = useState(null);
    const [alerta, setAlerta] = useState('');
    const navigate = useNavigate();

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
            const url = "http://localhost:4000/api/mascota/agregarMascota";
            await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setAlerta({
                mensaje: 'Mascota registrada correctamente',
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

    return (
        <>
            <div className="contenedor">
                <div className="text-center container-sm">
                    <div className="row align-items-start">
                        <div className="col div">
                            <img className='imge' src="https://media.istockphoto.com/id/1445196818/es/foto/grupo-de-lindas-mascotas-sobre-fondo-blanco-dise%C3%B1o-de-banner.jpg?s=612x612&w=0&k=20&c=JTUk_9yiSEj1ahD4K68d13oiTsp1ks9PmCxK1bPzxKI=" alt="MascotaF" />
                        </div>

                        <div className="col">
                            <div className="container-sm divForm ">
                                <h1>Registrar Mascota</h1>
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
                                        <button type="submit" className="btn btn-outline-primary">Registrar Mascota</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AgregarMascota;
