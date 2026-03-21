import { createAdminToken, getAdminCredentialsForLogin } from '../middleware/adminAuth.js';

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const adminCredentials = getAdminCredentialsForLogin();

    if (username !== adminCredentials.username || password !== adminCredentials.password) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    const token = createAdminToken(username, password);
    res.json({
      success: true,
      token,
      user: { username },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Failed to login admin' });
  }
};
