//console.log("Desde node.js")
import express from "express"
import conectarDB from "./config/db.js"
import veterinarioRoutes from "./routes/veterinarioRoutes.js"
import mascotaRoutes from "./routes/mascotaRoutes.js"
import cors from "cors";
import path from "path";


const app = express()
app.use(express.json())

conectarDB()

const dominiosPermitidos = ["http://localhost:3000"]
const corsOptions = {
    origin: function (origin, callback) {
        if (dominiosPermitidos.indexOf(origin) !== 1) {
            callback(null, true)
        } else {
            callback(new Error("No permitido por CORS"))
        }
    }
}



app.use(cors(corsOptions))


app.use("/api/veterinario", veterinarioRoutes)  
app.use("/api/mascota", mascotaRoutes)  

app.listen(4000, ()=>{
    console.log("Servidor Funcionando en localhost:4000")
})