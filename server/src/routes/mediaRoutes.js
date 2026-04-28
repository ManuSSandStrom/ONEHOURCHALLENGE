import express from 'express';
import { getPublicMedia } from '../controllers/mediaController.js';

const router = express.Router();

router.get('/', getPublicMedia);

export default router;
