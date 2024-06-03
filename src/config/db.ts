import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv"
dotenv.config()

export const db = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    models: [__dirname + '/../models/**/*.ts']
})


export default db