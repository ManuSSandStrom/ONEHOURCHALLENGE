import Booking from '../models/Booking.js';
import Payment from '../models/Payment.js';
import { sendUPIPaymentEmail } from '../utils/mailer.js';

// Submit UPI payment proof
export const submitUPIPayment = async (req, res) => {
  try {
    const { bookingId, utrNumber, amount, planType, duration, name, email, mobile } = req.body;

    if (!utrNumber || !bookingId) {
      return res.status(400).json({ error: 'UTR number and booking details are required' });
    }

    // Check if UTR already exists
    const existingPayment = await Payment.findOne({ razorpayPaymentId: utrNumber });
    if (existingPayment) {
      return res.status(400).json({ error: 'This UTR number has already been used' });
    }

    // Create payment record
    const payment = new Payment({
      userId: req.body.userId || null,
      bookingId,
      razorpayOrderId: `UPI_${Date.now()}`,
      razorpayPaymentId: utrNumber,
      amount,
      planType,
      duration,
      status: 'completed',
    });

    await payment.save();

    // Update booking payment status
    await Booking.findByIdAndUpdate(bookingId, {
      paymentId: utrNumber,
      paymentStatus: 'completed',
    });

    // Send confirmation email to admin
    await sendUPIPaymentEmail({
      name,
      email,
      mobile,
      planType,
      duration,
      amount,
      utrNumber,
    });

    res.status(201).json({ success: true, message: 'Payment recorded successfully' });
  } catch (error) {
    console.error('UPI payment submission error:', error);
    res.status(500).json({ error: 'Failed to record payment' });
  }
};
