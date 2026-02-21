import express from 'express';
import { createOrder, verifyPayment, getUserPayments, getAllPayments, getPricing } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create-order', createOrder);
router.post('/verify', verifyPayment);
router.get('/user/:userId', getUserPayments);
router.get('/all', getAllPayments);
router.get('/pricing', getPricing);

export default router;
