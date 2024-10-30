import veterinario from "../models/Veterinario.js";
import Veterinario from "../models/Veterinario.js";
import generarID from "../helpers/generarID.js";
import generarJWT from "../helpers/generarJWT.js";
import nodemailer, { createTransport } from "nodemailer";

const registrar = async (req, res) => {
    const { email, nombre } = req.body;

    const existeUsuario = await Veterinario.findOne({ email });

    if (existeUsuario) {
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({ mensaje: error.message });
    }

    try {
        const veterinario = new Veterinario(req.body);
        const veterinarioSave = await veterinario.save();
        //console.log("Eviando mensaje...")
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'dulcevsgonsa@gmail.com',
                pass: 'xink xhtu qpuv uowz'
            }
        });

        const mailOptions = {
            from: 'dulcevsgonsa@gmail.com',
            to: email,
            subject: 'Confirma tu cuenta',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h1 style="color: #4CAF50;">Hola, ${nombre}</h1>
                    <p>Gracias por registrarte. Por favor, haz clic en el siguiente enlace para confirmar tu cuenta:</p>
                    <p style="text-align: center;">
                        <a href="http://localhost:3000/confirmar/${veterinario.token}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; background-color: #4CAF50; color: #fff; text-decoration: none; font-weight: bold; border-radius: 5px;">
                        Confirmar Cuenta
                        </a>
                    </p>
                    <p>Si no has solicitado esta cuenta, puedes ignorar este correo.</p>
                    <br>
                    <p>Saludos,</p>
                    <p>El equipo de desarrollo</p>
                </div>
                `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).send(error.toString());
            }
            res.status(200).json({ mensaje: 'Correo de confirmación enviado' });
        });
        //console.log("Correo enviado")

    } catch (e) {
        console.log(e);
        res.status(500).json({ mensaje: 'Error al registrar el usuario' });
    }
}

const confirmar = async (req, res) => {
    console.log(req.params.token)

    const { token } = req.params;

    const usuarioConfirmar = await veterinario.findOne({ token });

    if (!usuarioConfirmar) {
        const error = new Error("Token no valido")
        return res.status(404).json({ mensaje: error.message })
    }

    try {
        //usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();
        res.json({ mensaje: "La cuenta ha sido confirmada", confirmado: true })

    } catch (e) {
        console.log(e)
    }
}


const autenticar = async (req, res) => {
    const { email, password } = req.body;
    console.log(email)
    const usuario = await Veterinario.findOne({ email });

    if (!usuario) {
        const error = new Error("Usuario NO existe")
        return res.status(400).json({ mensaje: error.message })
    }

    if (!usuario.confirmado) {
        const error = new Error("Tu correo no ha sido confirmado")
        return res.status(403).json({ mensaje: error.message })
    }

    if (await usuario.ComprobarPassword(password)) {
        res.json({ token: generarJWT(usuario.id), nombre: usuario.nombre })
    } else {
        const error = new Error("El password es incorrecto")
        return res.status(400).json({ mensaje: error.message })
    }
}

const perfil = (req, res) => {
    const { veterinario } = req;
    res.json({ perfil: veterinario })
}

const olvidePassword = async (req, res) => {
    const { email } = req.body;
    const usuario = await Veterinario.findOne({ email });

    if (!usuario) {
        const error = new Error("No existe usuario");
        return res.status(404).json({ mensaje: error.message });
    }

    usuario.token = generarID();
    await usuario.save();

    const transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'dulcevsgonsa@gmail.com',
            pass: 'xink xhtu qpuv uowz'
        }
    });

    const mailOptions = {
        from: 'dulcevsgonsa@gmail.com',
        to: email,
        subject: 'Restablecer Contraseña',
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h1 style="color: #4CAF50;">Hola, ${usuario.nombre}</h1>
                <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para restablecerla:</p>
                <p style="text-align: center;">
                    <a href="http://localhost:3000/olvide-password/${usuario.token}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; background-color: #4CAF50; color: #fff; text-decoration: none; font-weight: bold; border-radius: 5px;">
                        Restablecer Contraseña
                    </a>
                </p>
                <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
                <br>
                <p>Saludos,</p>
                <p>El equipo de desarrollo</p>
                <hr style="border: 1px solid #4CAF50;">
            </div>
        `
    };

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ mensaje: "Error al enviar el correo" });
        }
        console.log('Correo enviado: ' + info.response);
    });

    res.json({ mensaje: "Se ha enviado un token de restablecimiento de contraseña" });
};

const comprobarToken = async (req, res) => {
    const { token } = req.params;
    try {
        const usuario = await Veterinario.findOne({ token: token });

        if (!usuario) {
            const error = new Error("Token no válido");
            return res.status(400).json({ mensaje: error.message });
        }

        res.json({ mensaje: "Token válido" });
    } catch (error) {
        console.error('Error verificando token:', error); 
        res.status(500).json({ mensaje: "Error del servidor" });
    }
};

const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const usuario = await Veterinario.findOne({ token: token });

    if (!usuario) {
        const error = new Error("Token no válido");
        return res.status(400).json({ mensaje: error.message });
    }

    usuario.password = password;
    usuario.token = null; 
    await usuario.save();
    console.log(password);
    res.json({ mensaje: "Contraseña actualizada correctamente" });
};

const eliminarToken = async (req, res) => {
    const { token } = req.params;

    const usuario = await veterinario.findOne({ token });

    if (!usuario) {
        const error = new Error("Token no valido");
        return res.status(404).json({ mensaje: error.message });
    }

    try {
        usuario.token = null;
        await usuario.save();
        res.json({ mensaje: "Token eliminado correctamente" });
    } catch (e) {
        console.log(e);
    }
};


const registrarUbicacion = async (req, res) => {
    const { email, latitud, longitud } = req.body;
    try {
        const usuario = await Veterinario.findOne({ email });

        if (!usuario) {
            const error = new Error("Usuario no encontrado");
            return res.status(404).json({ mensaje: error.message });
        }

        const nuevaUbicacion = { latitud, longitud };
        usuario.ubicaciones.push(nuevaUbicacion);
        await usuario.save();

        res.json({ mensaje: "Ubicación registrada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al registrar la ubicación" });
    }
};

const obtenerUbicaciones = async (req, res) => {
    try {
        const ubicaciones = await Veterinario.find({ "ubicaciones.0": { $exists: true } }).select('nombre ubicaciones -_id');
        res.json(ubicaciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener las ubicaciones" });
    }
};

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    eliminarToken,
    registrarUbicacion,
    obtenerUbicaciones
};


