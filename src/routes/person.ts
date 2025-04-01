import { Router } from "express"
import { validatePersonRegistration } from "../validators/person"
import { createPerson, getPersons, deletePerson, updatePerson, getPersonById, getPersonSummary } from "../controllers/person"
import { authenticateToken } from '../middleware/auth';


const router = Router();

// Todas las rutas requieren autenticación
//router.use(authenticateToken as any);

router.post('/', validatePersonRegistration, createPerson);
router.get('/', getPersons);
router.get('/summary', getPersonSummary);
router.delete('/:public_id', deletePerson);
router.put('/:public_id', updatePerson);
router.get('/:public_id', getPersonById);

export default router;