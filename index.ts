import app from './src/app'
import express from 'express';
import type {Request, Response} from "express";

const PORT = process.env.DB_PORT || 8000;


app.get("/", (req: Request, res: Response) => {
    res.send(" CRM Api - v07.03.2025")
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}. http://192.168.100.213:${PORT}`);
  });