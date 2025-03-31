import app from './src/app'
import type {Request, Response} from "express";
import routes from './src/routes';
require('dotenv');

const PORT = process.env.SRV_PORT || 8000;


app.get("/", (req: Request, res: Response) => {
    res.send(" CRM Api - v07.03.2025")
})

app.use('/api/', routes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}. http://192.168.100.213:${PORT}`);
  });