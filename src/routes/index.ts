import { Router } from "express";
import person from "./person";
import user from "./user";
import auth from "./auth";

const router = Router();

router.use('/person', person);
router.use('/user', user);
router.use('/auth', auth);

export default router;
