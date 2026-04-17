import express from 'express';
import { createLead, getAllLeads, updateLeadStatus } from '../controllers/leadController.js';

const router = express.Router();

router.post('/', createLead);
router.get('/', getAllLeads);
router.patch('/:id/status', updateLeadStatus);

export default router;
