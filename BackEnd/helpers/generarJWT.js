import jwt from "jsonwebtoken";

const generarJWT = ( id ) => {
    return jwt.sign({ id }, 'palabraultrasecreta', { 
        expiresIn: "30d",
    })
}

export default generarJWT