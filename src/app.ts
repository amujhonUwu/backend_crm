import express from 'express';
import { mysqlDataSource } from "../app-data-source"
import cookieParser from 'cookie-parser';

mysqlDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const app = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');



console.log(process.env.DB_HOST)
console.log(process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined)
console.log(process.env.DB_USER)
console.log(process.env.DB_PSWD)
console.log(process.env.DB_NAME)


// Middlewares
// Configuración de CORS
app.use(cors({
    origin: 'http://127.0.0.1',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());
app.use(helmet());
app.use(express.json()); // Para parsear body en JSON
app.use(morgan('dev'));

export default app;
