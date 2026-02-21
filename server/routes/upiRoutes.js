import express from 'express';
import { submitUPIPayment } from '../controllers/upiController.js';

const router = express.Router();

router.post('/submit', submitUPIPayment);

export default router;
