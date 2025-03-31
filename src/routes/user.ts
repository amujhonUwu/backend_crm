import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/user';
import { validateUserRegistration } from '../validators/user';

const router = Router();

// Crear un usuario
router.post('/', validateUserRegistration, createUser);

// Obtener todos los usuarios
router.get('/', getUsers);

// Obtener un usuario por public_id
router.get('/:public_id', getUserById);

// Actualizar un usuario
router.put('/:public_id', updateUser);

// Eliminar un usuario
router.delete('/:public_id', deleteUser);

export default router;
