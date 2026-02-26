import UserProfile from '../models/UserProfile.js';

// GET /api/profile/:clerkUserId — Get user profile
export const getProfile = async (req, res) => {
  try {
    const { clerkUserId } = req.params;
    let profile = await UserProfile.findOne({ clerkUserId });
    
    if (!profile) {
      // Return empty profile structure (not saved yet)
      return res.json({ exists: false, profile: null });
    }
    
    res.json({ exists: true, profile });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

// POST /api/profile — Create or update profile
export const upsertProfile = async (req, res) => {
  try {
    const { clerkUserId, ...profileData } = req.body;
    
    if (!clerkUserId) {
      return res.status(400).json({ error: 'clerkUserId is required' });
    }

    // Check if all required fields are filled to mark profile as completed
    const isCompleted = !!(
      profileData.name && 
      profileData.phone && 
      profileData.age && 
      profileData.height && 
      profileData.weight && 
      profileData.fitnessGoal
    );

    const profile = await UserProfile.findOneAndUpdate(
      { clerkUserId },
      { ...profileData, clerkUserId, profileCompleted: isCompleted },
      { upsert: true, new: true, runValidators: true }
    );

    res.json({ success: true, profile });
  } catch (error) {
    console.error('Upsert profile error:', error);
    res.status(500).json({ error: 'Failed to save profile' });
  }
};
