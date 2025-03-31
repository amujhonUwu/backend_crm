// src/routes/auth.routes.ts
import { Router } from 'express';
import { login, register } from '../controllers/auth';
import { validateLogin } from '../validators/auth';
import { validatePersonRegistration } from '../validators/person';

const router = Router();

// Rutas públicas
router.post('/login', validateLogin, login as any);
router.post('/register', validatePersonRegistration, register as any);

export default router;
