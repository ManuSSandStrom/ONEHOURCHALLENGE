import { createAdminToken, getAdminCredentialsForLogin } from '../middleware/adminAuth.js';
import bcrypt from 'bcryptjs';

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const adminCredentials = getAdminCredentialsForLogin();

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    const passwordIsHash = adminCredentials.password.startsWith('$2');
    const passwordMatches = passwordIsHash
      ? await bcrypt.compare(password, adminCredentials.password)
      : password === adminCredentials.password;

    if (username !== adminCredentials.username || !passwordMatches) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }

    const token = createAdminToken(username);
    res.json({
      success: true,
      data: { token, user: { username } },
      token,
      user: { username },
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ success: false, message: 'Failed to login admin' });
  }
};
