import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: { type: String, default: null },
  email: { type: String, default: null },
  mobile: { type: String, default: null },
  source: { type: String, enum: ['ai-assistant', 'contact-form', 'booking'], default: 'ai-assistant' },
  messages: [{
    role: { type: String, enum: ['user', 'assistant'] },
    content: { type: String },
    timestamp: { type: Date, default: Date.now }
  }],
  status: { type: String, enum: ['new', 'contacted', 'converted'], default: 'new' },
}, { timestamps: true });

export default mongoose.model('Lead', leadSchema);
