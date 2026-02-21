import Razorpay from 'razorpay';
import crypto from 'crypto';
import Payment from '../models/Payment.js';
import Booking from '../models/Booking.js';
import { sendPaymentConfirmationEmail } from '../utils/mailer.js';

let razorpay = null;

const getRazorpay = () => {
  if (!razorpay && process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
    && process.env.RAZORPAY_KEY_ID !== 'YOUR_RAZORPAY_KEY_ID') {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return razorpay;
};

// Pricing configuration (in paise - INR smallest unit)
const PRICING = {
  PRO: {
    '1-Month': 149900,   // ₹1,499
    '3-Month': 299900,   // ₹2,999
    '6-Month': 599900,   // ₹5,999
    'Yearly': 799900,    // ₹7,999
  },
  ADVANCE: {
    '1-Month': 299900,   // ₹2,999
    '3-Month': 599900,   // ₹5,999
    '6-Month': 799900,   // ₹7,999
    'Yearly': 999900,    // ₹9,999
  }
};

// Create Razorpay order
export const createOrder = async (req, res) => {
  try {
    const { planType, duration, bookingId } = req.body;
    const amount = PRICING[planType]?.[duration];

    if (!amount) {
      return res.status(400).json({ error: 'Invalid plan or duration' });
    }

    const options = {
      amount,
      currency: 'INR',
      receipt: `booking_${bookingId}_${Date.now()}`,
      notes: { planType, duration, bookingId },
    };

    const rzp = getRazorpay();
    if (!rzp) {
      return res.status(503).json({ error: 'Payment gateway not configured. Please contact support.' });
    }

    const order = await rzp.orders.create(options);

    const payment = new Payment({
      userId: req.body.userId || null,
      bookingId,
      razorpayOrderId: order.id,
      amount: amount / 100,
      planType,
      duration,
    });

    await payment.save();

    res.json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Failed to create payment order' });
  }
};

// Verify payment
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      // Update payment record
      const payment = await Payment.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          status: 'completed',
        },
        { new: true }
      );

      // Update booking payment status
      if (payment?.bookingId) {
        await Booking.findByIdAndUpdate(payment.bookingId, {
          paymentId: razorpay_payment_id,
          paymentStatus: 'completed',
        });
      }

      // Send confirmation email
      await sendPaymentConfirmationEmail(payment);

      res.json({ success: true, message: 'Payment verified successfully' });
    } else {
      // TODO: Handle payment verification failure.
      // For example, you might want to update the booking status to 'failed'
      // and log the failed attempt.
      res.status(400).json({ error: 'Payment verification failed' });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ error: 'Payment verification failed' });
  }
};

// Get user payments
export const getUserPayments = async (req, res) => {
  try {
    const { userId } = req.params;
    const payments = await Payment.find({ userId, status: 'completed' }).sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
};

// Get all payments (admin)
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 }).populate('bookingId');
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
};

// Get pricing
export const getPricing = async (req, res) => {
  const formattedPricing = {};
  for (const plan in PRICING) {
    formattedPricing[plan] = {};
    for (const duration in PRICING[plan]) {
      formattedPricing[plan][duration] = PRICING[plan][duration] / 100;
    }
  }
  res.json(formattedPricing);
};
