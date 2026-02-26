import express from 'express';
import { getProfile, upsertProfile } from '../controllers/profileController.js';

const router = express.Router();

router.get('/:clerkUserId', getProfile);
router.post('/', upsertProfile);

export default router;
