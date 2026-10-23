import express from 'express';
import { getComments, getCommentById, createComment } from '../controller/commentsController.js';

const router = express.Router({mergeParams: true});

router.get('/', getComments);
router.get('/:commentId', getCommentById);
router.post('/', createComment);

export default router;