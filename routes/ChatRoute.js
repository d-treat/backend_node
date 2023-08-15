import express from 'express'
import { createChat, findChat, groupChats } from '../controllers/chatController.js';

const router = express.Router()

router.post('/', createChat);
router.get('/:groupId', groupChats);
router.get('/find/:firstId/:secondId', findChat);

export default router