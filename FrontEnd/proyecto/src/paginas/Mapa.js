import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import "../css/mapa.css";

const containerStyle = {
    width: '100%',
    height: '70vh',
};

const center = {
    lat: 19.431232,
    lng: -100.372579,
};

const Mapa = () => {
    const [ubicaciones, setUbicaciones] = useState([]);

    useEffect(() => {
        const fetchUbicaciones = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/veterinario/ubicaciones');
                const todasUbicaciones = response.data.flatMap(usuario =>
                    usuario.ubicaciones.map(ubicacion => ({
                        nombre: usuario.nombre,
                        latitud: ubicacion.latitud,
                        longitud: ubicacion.longitud,
                        fecha: ubicacion.fecha
                    }))
                );
                setUbicaciones(todasUbicaciones);
            } catch (error) {
                console.error('Error al obtener las ubicaciones', error);
            }
        };

        fetchUbicaciones();
    }, []);

    return (
        <div className="map-container">
            <h2>Ubicaciones</h2>
            <LoadScript googleMapsApiKey="AIzaSyCAhVvm_4d26x88NDoAc8JGvebPwN3ETIA">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={15}
                    options={{ disableDefaultUI: true, zoomControl: true }} 
                    className="google-map"
                >
                    {ubicaciones.map((ubicacion, index) => (
                        <Marker
                            key={index}
                            position={{ lat: ubicacion.latitud, lng: ubicacion.longitud }}
                            label={ubicacion.nombre}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>
            <Link to="/listadoMascotas" className="regresar-btn">
                Regresar al Listado de Mascotas
            </Link>
        </div>
    );
};

export default Mapa;
