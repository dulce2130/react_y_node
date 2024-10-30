import { useState } from "react";
import Alerta from "../components/Alerta.js";
import axios from "axios";

const Registrar = () => {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');

    const [alerta, setAlerta] = useState('')

    const limpiarCampos = () => {
        setNombre('');
        setEmail('');
        setPassword('');
        setRepetirPassword('');
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if ([nombre, email, password, repetirPassword].includes('')) {
            console.log("Hay campos vacios")
            setAlerta({
                mensaje: "Hay campos vacios",
                error: true
            })
            return
        }

        if (password != repetirPassword) {
            console.log("Los password no son inguales")
            setAlerta({
                mensaje: 'los pasword no son iguales',
                error: true
            })
            return
        }

        if (password.length < 6) {
            console.log("El password es menor a 6")
            setAlerta({
                mensaje: 'El password es muy corto, agrega minimo 6 caracteres',
                error: true
            })
            return
        }

        setAlerta({})

        try {

            const url = "http://localhost:4000/api/veterinario"
            await axios.post(url, { nombre, email, password })
            setAlerta({
                mensaje: '¡Registrado con éxito! Revisa tu email para confirmar la cuenta',
                error: false
            })

            limpiarCampos()

        } catch (error) {
            console.log(error.response)
            setAlerta({
                mensaje: error.response.data.mensaje,
                error: true
            })
        }

    }


    return (
        <>
            <div className="contenedor">
                <div className="container text-center container-sm">
                    <div className="row align-items-start">
                        <div className="col div ">
                            <img className='imge' src="https://i.pinimg.com/736x/ce/80/f5/ce80f5cdff3aa5ec3eb7072348d41075.jpg" />
                        </div>

                        <div className="col">
                            <div className="container-sm divForm">
                                <h1>Registrar</h1>
                                <form className="row g-3 needs-validation form" onSubmit={handleSubmit}>
                                    <Alerta
                                        alerta={alerta}
                                    />

                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label text">Nombre:</label>
                                        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} className="form-control" id="nombre" placeholder="Ej.: John Doe" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label text">Correo Electrónico:</label>
                                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" id="correo" placeholder="Ej.: name@example.com" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="inputPassword5" className="form-label text">Contraseña:</label>
                                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} id="pass" className="form-control" aria-describedby="passwordHelpBlock" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="inputPassword5" className="form-label text">Confirmar Contraseña:</label>
                                        <input type="password" value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)} id="repetir" className="form-control" aria-describedby="passwordHelpBlock" />
                                    </div>


                                    <div className="mb-3 divButton">
                                        <button type="submit" className="btn btn-outline-primary">Registrar</button>
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

export default Registrar;