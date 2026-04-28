import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const createAdminToken = (username) => {
  return jwt.sign({ username, role: 'admin' }, env.jwtSecret, { expiresIn: '24h' });
};

export const verifyAdminToken = (token) => jwt.verify(token, env.jwtSecret);

export const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  try {
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized admin access' });
    }

    req.admin = verifyAdminToken(token);
    next();
  } catch (_error) {
    return res.status(401).json({ success: false, message: 'Unauthorized admin access' });
  }
};

export const getAdminCredentialsForLogin = () => ({
  username: env.adminUsername,
  password: env.adminPassword,
});
