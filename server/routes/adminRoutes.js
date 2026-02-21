import express from 'express';
import { getDashboardStats, getLeads, exportBookingsCSV } from '../controllers/adminController.js';
import { getAllBookings } from '../controllers/bookingController.js';
import { getAllPayments } from '../controllers/paymentController.js';

const router = express.Router();

router.get('/stats', getDashboardStats);
router.get('/bookings', getAllBookings);
router.get('/payments', getAllPayments);
router.get('/leads', getLeads);
router.get('/export/bookings', exportBookingsCSV);

export default router;
