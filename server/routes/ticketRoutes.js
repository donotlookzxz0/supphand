import express from 'express';
import { getAllTickets, getTicketById, createTicket } from '../controller/ticketController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getAllTickets);
router.get('/:id', getTicketById);
router.post('/', createTicket);

export default router;