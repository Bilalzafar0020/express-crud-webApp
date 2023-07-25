
import express from 'express';
const router = express.Router();

import todoRouter from './routes/todo.mjs';
router.use(todoRouter);

export default router;
