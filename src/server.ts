import express from "express";
import db from "./config/db";
import router from "./router";

async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log('conexión con éxito')
    } catch (error) {
        console.log(error)
        console.log('Tuviste un Error')
    }
}

connectDB()

// Instanxcia de express
const server = express()

// Leer datos de formularios middleware
server.use(express.json())

// Routing
server.use('/api/products', router)


export default server