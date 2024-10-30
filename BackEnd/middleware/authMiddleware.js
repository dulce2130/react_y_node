import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

const checkAuth = async (req, res, next) => {
    console.log(req.headers)
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {

            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, "palabraultrasecreta")
            req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado")

            return next();
            
        } catch (e) {
            const error = new Error("Token no valido")
            return res.status(403).json({mensaje: error.message})
        }        
    }

    if (!token) {
        const error = new Error("Token no valido o inexistente")

        return res.status(403).json({mensaje: error.message})
    }

    next();
}

export default checkAuth