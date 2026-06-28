import express from 'express'
import protectRoute from '../middleware/protectRoute.js'
import { sendMessages, getMessages, deleteMessage } from '../controllers/message.controller.js';

const router = express.Router();

router.post('/sendmsg/:id', protectRoute, sendMessages)
router.get('/getmsg/:id', protectRoute, getMessages)
router.delete('/deletemsg/:msgid', protectRoute, deleteMessage)

export default router