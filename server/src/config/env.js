import dotenv from 'dotenv';

dotenv.config();

const requiredInProduction = ['MONGODB_URI', 'CLIENT_URL', 'JWT_SECRET'];

if (process.env.NODE_ENV === 'production') {
  const missing = requiredInProduction.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGODB_URI || '',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  jwtSecret: process.env.JWT_SECRET || 'development_admin_secret',
  adminUsername: process.env.ADMIN_USERNAME || process.env.ADMIN_PORTAL_USERNAME || 'admin',
  adminPassword: process.env.ADMIN_PASSWORD || process.env.ADMIN_PORTAL_PASSWORD || 'OHCAdmin@2026',
};
