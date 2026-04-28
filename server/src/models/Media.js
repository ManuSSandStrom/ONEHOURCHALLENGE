import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  type: { type: String, enum: ['image', 'video'], required: true },
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  thumbnailUrl: { type: String, default: null },
  caption: { type: String, default: '' },
  displayOrder: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Media', mediaSchema);
