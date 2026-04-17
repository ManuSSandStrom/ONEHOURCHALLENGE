import express from 'express';
import { chatWithAI, submitLead } from '../controllers/aiController.js';

const router = express.Router();

router.post('/chat', chatWithAI);
router.post('/lead', submitLead);

export default router;
