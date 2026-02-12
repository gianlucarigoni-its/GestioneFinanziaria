import { Router } from 'express';
import { Login } from "./authController";

const router = Router();

router.use("/login", Login);

export default router;

