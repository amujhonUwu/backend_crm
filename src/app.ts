import express from 'express';

const app = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

require('dotenv');

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json()); // Para parsear body en JSON
app.use(morgan('dev'));

export default app;
