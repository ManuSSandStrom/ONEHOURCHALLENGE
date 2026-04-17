import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, default: null, trim: true },
  mobile: { type: String, required: true, trim: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], default: null },
  age: { type: Number, required: true, min: 10, max: 100 },
  location: { type: String, default: null, trim: true },
  source: {
    type: String,
    enum: ['registration', 'contact-form', 'booking', 'ai-assistant'],
    default: 'registration',
  },
  sourcePage: { type: String, required: true, trim: true },
  sourcePath: { type: String, default: null, trim: true },
  interestType: { type: String, default: 'general', trim: true },
  interestLabel: { type: String, default: 'General Enquiry', trim: true },
  planType: { type: String, default: null, trim: true },
  duration: { type: String, default: null, trim: true },
  message: { type: String, default: null, trim: true },
  messages: [{
    role: { type: String, enum: ['user', 'assistant'] },
    content: { type: String },
    timestamp: { type: Date, default: Date.now }
  }],
  status: {
    type: String,
    enum: ['new', 'contacted', 'closed', 'not-interested'],
    default: 'new',
  },
}, { timestamps: true });

export default mongoose.model('Lead', leadSchema);
