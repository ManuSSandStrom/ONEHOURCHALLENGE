import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  userId: { type: String, default: null },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  razorpayOrderId: { type: String, required: true },
  razorpayPaymentId: { type: String, default: null },
  razorpaySignature: { type: String, default: null },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  planType: { type: String, enum: ['PRO', 'ADVANCE'], required: true },
  duration: { type: String, required: true },
  status: { type: String, enum: ['created', 'completed', 'failed'], default: 'created' },
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);
