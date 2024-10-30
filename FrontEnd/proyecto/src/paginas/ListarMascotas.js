import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ListarMascotas = () => {
    const [mascotas, setMascotas] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const { user, logout } = useContext(AuthContext);
    const { nombre } = user || {};
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerMascotas = async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/api/mascota/listadoMascotas');
                setMascotas(data);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerMascotas();
    }, []);

    const eliminarMascota = async id => {
        const confirmar = window.confirm('¿Estás seguro de que deseas eliminar esta mascota?');
        if (confirmar) {
            try {
                await axios.delete(`http://localhost:4000/api/mascota/eliminar/${id}`);
                setMascotas(mascotas.filter(mascota => mascota._id !== id));
            } catch (error) {
                console.error('Error al eliminar la mascota:', error);
            }
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleSearchChange = (e) => {
        setBusqueda(e.target.value);
    };

    const mascotasFiltradas = mascotas.filter(mascota =>
        mascota.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
        mascota.propietario?.toLowerCase().includes(busqueda.toLowerCase()) ||
        mascota.email?.toLowerCase().includes(busqueda.toLowerCase()) ||
        mascota.sintomas?.toLowerCase().includes(busqueda.toLowerCase())
    );

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(mascotas);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setMascotas(items);
    };

    return (
        <div className='contenedor'>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand">¡Hola, {nombre}!</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link" aria-current="page" to="/agregarMascota">Nueva Mascota</Link>
                            <Link className="nav-link" aria-current="page" to="/mapa">Mapa</Link>
                            <button className="nav-link btn btn-link" onClick={handleLogout}>Cerrar Sesión</button>
                        </div>
                    </div>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Buscar..."
                            value={busqueda}
                            onChange={handleSearchChange} />
                    </form>
                </div>
            </nav>

            <h2>Listado de Mascotas</h2>

            <DragDropContext onDragEnd={handleOnDragEnd}>
    <Droppable droppableId="mascotasDroppable">
        {(provided) => (
            <table className="table" {...provided.droppableProps} ref={provided.innerRef}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Propietario</th>
                        <th>Email</th>
                        <th>Fecha</th>
                        <th>Síntomas</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {mascotasFiltradas.map((mascota, index) => (
                        <Draggable key={mascota._id} draggableId={mascota._id.toString()} index={index}>
                            {(provided) => (
                                <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <td>{mascota.nombre}</td>
                                    <td>{mascota.propietario}</td>
                                    <td>{mascota.email}</td>
                                    <td>{new Date(mascota.fecha).toLocaleDateString()}</td>
                                    <td>{mascota.sintomas}</td>
                                    <td>
                                        <Link to={`/detallesMascota/${mascota._id}`} className="btn btn-info">Detalles</Link>
                                        <Link to={`/modificarMascota/${mascota._id}`} className="btn btn-warning">Modificar</Link>
                                        <button onClick={() => eliminarMascota(mascota._id)} className="btn btn-danger">Eliminar</button>
                                    </td>
                                </tr>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </tbody>
            </table>
        )}
    </Droppable>
</DragDropContext>


        </div>
    );
};

export default ListarMascotas;
