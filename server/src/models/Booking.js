import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: String, default: null },
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  planType: { type: String, enum: ['PRO', 'ADVANCE'], required: true },
  duration: { type: String, enum: ['1-Month', '3-Month', '6-Month', 'Yearly'], required: true },
  preferredDays: { type: [String], required: true },
  preferredTimeSlot: { type: String, required: true },
  bookingsPerWeek: { type: Number, required: true },
  maxBookingsAllowed: { type: Number, required: true },
  paymentId: { type: String, default: null },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  status: { type: String, enum: ['active', 'inactive', 'expired'], default: 'active' },
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
