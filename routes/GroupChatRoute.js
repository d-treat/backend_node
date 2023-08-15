import express from 'express';
import { getGroup, getAllGroups, updateGroup } from '../controllers/GroupChatController.js';
import authMiddleWare from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.get('/:id', getGroup);
router.get('/', getAllGroups);
router.put('/:id', authMiddleWare, updateGroup);

export default router;
