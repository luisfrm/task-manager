import { Router } from "express";
import taskController from "../controllers/task.controller.js";
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema, validatePartialSchema } from '../middlewares/validator.middleware.js';
import { taskSchema } from '../schemas/task.schema.js';

const router = Router();

router.get('/tasks', authRequired, taskController.findAll);

router.get('/tasks/:id', authRequired, taskController.findOne);

router.post('/tasks', authRequired, validateSchema(taskSchema), taskController.create);

router.delete('/tasks/:id', authRequired, taskController.delete);

router.put('/tasks/:id', authRequired, validatePartialSchema(taskSchema), taskController.update);

router.delete('/tasks/:id', authRequired, taskController.delete);

export default router;