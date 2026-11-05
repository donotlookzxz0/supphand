import express from 'express';
import { getAllTickets, getTicketById, createTicket } from '../controller/ticketController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { verifyRole } from '../middleware/rbac.js';
import commentRoutes from '../routes/commentRoutes.js'

const router = express.Router();

router.use(authMiddleware, verifyRole(['user', 'staff', 'admin']));
router.use('/:ticketId/comments', verifyRole(['user', 'staff', 'admin']), commentRoutes);

router.get('/', verifyRole(['user']), getAllTickets);
router.get('/:ticketId', verifyRole(['user', 'staff', 'admin']), getTicketById);
router.post('/', verifyRole(['user']), createTicket);

export default router;