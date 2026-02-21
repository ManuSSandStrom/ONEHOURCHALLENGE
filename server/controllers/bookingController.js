import Booking from '../models/Booking.js';
import { sendBookingEmail } from '../utils/mailer.js';

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { name, email, mobile, planType, duration, preferredDays, preferredTimeSlot } = req.body;

    // Booking rules validation
    let bookingsPerWeek, maxBookingsAllowed;
    if (planType === 'PRO') {
      bookingsPerWeek = 3;
      maxBookingsAllowed = 4;
      if (preferredDays.length > 3) {
        return res.status(400).json({ error: 'PRO plan allows max 3 days per week' });
      }
    } else if (planType === 'ADVANCE') {
      bookingsPerWeek = 5;
      maxBookingsAllowed = 6;
      if (preferredDays.length > 5) {
        return res.status(400).json({ error: 'ADVANCE plan allows max 5 days per week' });
      }
    } else {
      return res.status(400).json({ error: 'Invalid plan type' });
    }

    // TODO: Add validation to check if the user has reached the maximum number of bookings for the week.
    const booking = new Booking({
      userId: req.body.userId || null,
      name,
      email,
      mobile,
      planType,
      duration,
      preferredDays,
      preferredTimeSlot,
      bookingsPerWeek,
      maxBookingsAllowed,
    });

    await booking.save();

    // Send confirmation email
    await sendBookingEmail(booking);

    res.status(201).json({ success: true, booking });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

// Get user bookings
export const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ userId }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

// Get all bookings (admin)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};
