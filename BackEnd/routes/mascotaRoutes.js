import express from 'express';
import { agregarMascota, obtenerMascotas, eliminarMascota, modificarMascota, obtenerMascota } from '../controllers/mascotaController.js';

const router = express.Router();

router.post("/agregarMascota", agregarMascota);
router.get("/listadoMascotas", obtenerMascotas);
router.delete("/eliminar/:id", eliminarMascota);
router.put("/modificarMascota/:id", modificarMascota);
router.get("/:id", obtenerMascota);

export default router;
