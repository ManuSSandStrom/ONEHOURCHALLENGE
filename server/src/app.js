import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { corsOptions } from './config/cors.js';
import apiRoutes from './routes/index.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const intakeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(helmet());
app.use(cors(corsOptions));
app.use(generalLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/leads', intakeLimiter);
app.use('/api/contact', intakeLimiter);
app.use('/api', apiRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
