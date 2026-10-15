import express from 'express';
import { getAllUserTickets, getUserTicketById, acceptTicket, closeTicket} from '../controller/staffController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { verifyRole } from '../middleware/rbac.js';

const router = express.Router();

router.use(authMiddleware, verifyRole(['admin']));

router.get('/', getAllUserTickets);
router.get('/:id', getUserTicketById);
router.put('/:id', acceptTicket);
router.put('/:id', closeTicket);


export default router;