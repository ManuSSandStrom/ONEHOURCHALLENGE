import { logger } from '../config/logger.js';

export const errorHandler = (error, req, res, next) => {
  logger.error('Unhandled application error:', error);

  if (res.headersSent) {
    return next(error);
  }

  return res.status(500).json({
    success: false,
    message: error.message || 'Internal server error',
    data: null,
  });
};
