import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema, validatePartialSchema } from '../middlewares/validator.middleware.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';

const router = Router();

router.post('/register', validateSchema(registerSchema), AuthController.register);

router.post('/login', validateSchema(loginSchema), AuthController.login);

router.post('/logout', AuthController.logout);

router.get('/profile', authRequired, AuthController.profile);

router.delete('/profile', authRequired, AuthController.removeProfile);

router.get('/verify-token', AuthController.verifyToken);

export default router;