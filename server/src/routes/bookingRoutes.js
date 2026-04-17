import express from 'express';
import { createBooking, getUserBookings, getAllBookings } from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/user/:userId', getUserBookings);
router.get('/all', getAllBookings);

export default router;
