import mongoose from "mongoose";

const conectarDB = async () =>{
    try{
        const db = await mongoose.connect("mongodb+srv://dulce:silverspoon@cluster0.3chn819.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {

        })

        const url = `${db.connection.host}: ${db.connection.port}`
        console.log(`MongoDB conectado en ${url}`)

    }catch(error){
        console.log(`error: ${error.message}`)
        process.exit(1)
    }
}

export default conectarDB