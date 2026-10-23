import express from 'express';
import { getAllTickets, getTicketById, createTicket } from '../controller/ticketController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { verifyRole } from '../middleware/rbac.js';
import commentRoutes from '../routes/commentRoutes.js'

const router = express.Router();

router.use(authMiddleware, verifyRole(['user']));
router.use('/:ticketId/comments', commentRoutes);

router.get('/', getAllTickets);
router.get('/:ticketId', getTicketById);
router.post('/', createTicket);

export default router;