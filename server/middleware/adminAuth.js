const getAdminCredentials = () => ({
  username: process.env.ADMIN_PORTAL_USERNAME || 'admin',
  password: process.env.ADMIN_PORTAL_PASSWORD || 'OHCAdmin@2026',
});

export const createAdminToken = (username, password) => {
  return Buffer.from(`${username}:${password}`).toString('base64');
};

export const verifyAdminToken = (token) => {
  const { username, password } = getAdminCredentials();
  return token === createAdminToken(username, password);
};

export const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!token || !verifyAdminToken(token)) {
    return res.status(401).json({ error: 'Unauthorized admin access' });
  }

  next();
};

export const getAdminCredentialsForLogin = () => getAdminCredentials();
