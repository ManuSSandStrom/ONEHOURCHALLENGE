import express from 'express';
import { getDashboardStats, exportBookingsCSV } from '../controllers/adminController.js';
import { getAllBookings } from '../controllers/bookingController.js';
import { getAllLeads, updateLeadStatus, deleteLead } from '../controllers/leadController.js';
import { getAllContacts, updateContactStatus, deleteContact } from '../controllers/contactController.js';
import { loginAdmin } from '../controllers/adminAuthController.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

router.post('/login', loginAdmin);

router.use(adminAuth);

router.get('/stats', getDashboardStats);
router.get('/bookings', getAllBookings);
router.get('/leads', getAllLeads);
router.patch('/leads/:id/status', updateLeadStatus);
router.delete('/leads/:id', deleteLead);
router.get('/contacts', getAllContacts);
router.patch('/contacts/:id/status', updateContactStatus);
router.delete('/contacts/:id', deleteContact);
router.get('/export/bookings', exportBookingsCSV);

export default router;
