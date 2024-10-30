import express from "express";
import { registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword, eliminarToken, registrarUbicacion, obtenerUbicaciones } from "../controllers/veterinarioController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router()

router.post("/", registrar)
router.get("/confirmar/:token", confirmar)
router.post("/login", autenticar)
router.post("/password", olvidePassword)
router.get("/password/:token", comprobarToken)
router.post("/password/:token", nuevoPassword)
router.post('/eliminar-token/:token', eliminarToken);
router.post('/registrar-ubicacion', registrarUbicacion);
router.get('/ubicaciones', obtenerUbicaciones);

router.get("/perfil", checkAuth, perfil)

export default router