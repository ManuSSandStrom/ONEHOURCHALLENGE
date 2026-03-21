import express from 'express';
import { getDashboardStats, exportBookingsCSV } from '../controllers/adminController.js';
import { getAllBookings } from '../controllers/bookingController.js';
import { getAllPayments } from '../controllers/paymentController.js';
import { getAllLeads, updateLeadStatus } from '../controllers/leadController.js';
import { loginAdmin } from '../controllers/adminAuthController.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

router.post('/login', loginAdmin);

router.use(adminAuth);

router.get('/stats', getDashboardStats);
router.get('/bookings', getAllBookings);
router.get('/payments', getAllPayments);
router.get('/leads', getAllLeads);
router.patch('/leads/:id/status', updateLeadStatus);
router.get('/export/bookings', exportBookingsCSV);

export default router;
