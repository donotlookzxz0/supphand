import express from 'express';
import { getAllUserTickets, getUserTicketById, acceptTicket, resolveTicket} from '../controller/staffController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { verifyRole } from '../middleware/rbac.js';

const router = express.Router();

router.use(authMiddleware, verifyRole(['staff','admin']));

router.get('/', getAllUserTickets);
router.get('/:id', getUserTicketById);
router.put('/:id/accept', acceptTicket);
router.put('/:id/resolve', resolveTicket);


export default router;