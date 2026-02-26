import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
  clerkUserId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  age: { type: Number, default: null },
  gender: { type: String, enum: ['Male', 'Female', 'Other', ''], default: '' },
  height: { type: Number, default: null }, // in cm
  weight: { type: Number, default: null }, // in kg
  targetWeight: { type: Number, default: null },
  fitnessGoal: { type: String, enum: ['Weight Loss', 'Muscle Gain', 'Maintenance', 'Flexibility', 'General Fitness', ''], default: '' },
  activityLevel: { type: String, enum: ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Extremely Active', ''], default: '' },
  medicalConditions: { type: String, default: '' },
  profileCompleted: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('UserProfile', userProfileSchema);
