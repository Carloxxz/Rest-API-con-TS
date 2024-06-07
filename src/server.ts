import express from "express";
import cors, { CorsOptions } from "cors"
import morgan from "morgan"
import swaggerUi from "swagger-ui-express"
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import db from "./config/db";
import router from "./router";

export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log('conexión con éxito')
    } catch (error) {
        // console.log(error)
        console.log('Tuviste un Error al conectar la DB')
    }
}

connectDB()

// Instanxcia de express
const server = express()

// Permitir conexiones
server.use(morgan('dev'))
const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (origin === process.env.FRONTEND_URL) {
            console.log('permitir')
            callback(null, true)
        } else {
            console.log('Denegar...')
            callback(new Error ('Error de CORS'))
        }
    }
}
server.use(cors(corsOptions))

// Leer datos de formularios middleware
server.use(express.json())

// Routing
server.use('/api/products', router)

// server.get('/api', (req, res) => {
//     res.json({ msg: 'desde api' })
// })

// Docs

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server