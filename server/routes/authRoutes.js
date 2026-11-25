import express from 'express';
import {register, login, me, logout} from '../controller/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { authLimiter } from '../middleware/authLimiter.js'

const router = express.Router();

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.get('/me', authMiddleware, me)
router.post('/logout', logout);

export default router;