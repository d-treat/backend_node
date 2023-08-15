import express from 'express';
import { registerGroupChat } from '../controllers/AuthController.js';

const router = express.Router()


router.post('/register', registerGroupChat)


export default router