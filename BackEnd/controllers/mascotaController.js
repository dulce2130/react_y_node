import Mascota from "../models/Mascota.js";
//import veterinario from "../models/Veterinario.js";

const agregarMascota = async (req, res) => {
    console.log(req.body);
    const { nombre, propietario, email, fecha, sintomas } = req.body;

    const mascota = new Mascota({ nombre, propietario, email, fecha, sintomas });
    try {
        const mascotaGuardada = await mascota.save();
        res.json(mascotaGuardada);
    } catch (e) {
        console.log(e);
        res.status(500).json({ mensaje: 'Error al registrar la mascota' });
    }
};


const obtenerMascota = async (req, res) => {
    try {
        const mascota = await Mascota.findById(req.params.id);
        if (!mascota) {
            return res.status(404).json({ mensaje: 'Mascota no encontrada' });
        }
        res.json(mascota);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al obtener la mascota' });
    }
};

const obtenerMascotas = async (req, res) => {
    try {
        const mascotas = await Mascota.find().populate('veterinario', 'nombre email');
        res.json(mascotas);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al obtener las mascotas' });
    }
};

const eliminarMascota = async (req, res) => {
    try {
        console.log(`Eliminando mascota con ID: ${req.params.id}`);
        await Mascota.remove(req.params.id);
        if (!mascota) {
            console.log('Mascota no encontrada');
            return res.status(404).json({ mensaje: 'Mascota no encontrada' });
        }

        res.json({ mensaje: 'Mascota eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la mascota:', error); 
        res.status(500).json({ mensaje: 'Error al eliminar la mascota' });
    }
};


const modificarMascota = async (req, res) => {
    try {
        const mascota = await Mascota.findById(req.params.id);
        if (!mascota) {
            return res.status(404).json({ mensaje: 'Mascota no encontrada' });
        }

        const { nombre, propietario, email, fecha, sintomas } = req.body;
        mascota.nombre = nombre || mascota.nombre;
        mascota.propietario = propietario || mascota.propietario;
        mascota.email = email || mascota.email;
        mascota.fecha = fecha || mascota.fecha;
        mascota.sintomas = sintomas || mascota.sintomas;

        const mascotaActualizada = await mascota.save();
        res.json(mascotaActualizada);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al modificar la mascota' });
    }
};

export {
    agregarMascota,
    obtenerMascotas,
    eliminarMascota,
    modificarMascota,
    obtenerMascota
};
