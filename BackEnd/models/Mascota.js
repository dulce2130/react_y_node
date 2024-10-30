import mongoose from "mongoose";
import veterinario from "./Veterinario.js";

const mascotaSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    propietario:{
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    fecha: {
        type: Date,
        require: true,
        default: Date.now()
    },
    sintomas: {
        type: String,
        require: true
    },
    veterinario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Veterinario" //Es como recibe el veterinario mongo
    },
    imagen: {
        type: String, 
        required: false
    }

},{
    timestamps:true,
});

const Mascota = mongoose.model('Mascota', mascotaSchema); //Mascota es como lo recibe mongo
export default Mascota;