import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';

import appConfig from './config/app.config';
import environment from './config/environment';
import faucetRoutes from './routes/faucet.routes';
import { notFound, errorHandler } from './middleware/error.middleware';

/**
 * Create Express application
 */
const createApp = (): Express => {
  const app = express();

  // Security middleware
  app.use(helmet());
  
  // CORS setup
  app.use(cors(appConfig.cors));
  
  // Request logging
  app.use(morgan(environment.NODE_ENV === 'development' ? 'dev' : 'combined'));
  
  // Rate limiting
  app.use(
    rateLimit({
      windowMs: appConfig.rateLimit.windowMs,
      max: appConfig.rateLimit.max,
      standardHeaders: true,
      legacyHeaders: false,
      message: { success: false, error: 'Too many requests, please try again later.' }
    })
  );
  
  // Body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // Static files
  app.use(express.static(path.join(__dirname, '../public')));
  
  // API routes
  app.use(appConfig.api.prefix, faucetRoutes);
  
  // Error handling
  app.use(notFound);
  app.use(errorHandler);
  
  return app;
};

export default createApp;