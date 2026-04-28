import { Router } from 'express';
import bookingRoutes from './bookingRoutes.js';
import contactRoutes from './contactRoutes.js';
import aiRoutes from './aiRoutes.js';
import adminRoutes from './adminRoutes.js';
import leadRoutes from './leadRoutes.js';
import mediaRoutes from './mediaRoutes.js';
import { getHealthStatus } from '../controllers/healthController.js';

const router = Router();

router.get('/health', getHealthStatus);
router.use('/bookings', bookingRoutes);
router.use('/contact', contactRoutes);
router.use('/ai', aiRoutes);
router.use('/admin', adminRoutes);
router.use('/leads', leadRoutes);
router.use('/media', mediaRoutes);

export default router;
