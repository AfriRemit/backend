import environment from './environment';

const appConfig = {
  // API configuration
  api: {
    prefix: '/api',
    version: 'v1'
  },
  
  // CORS configuration
  cors: {
    origin: environment.CORS_ORIGIN,
    credentials: true
  },
  
  // Rate limiting configuration
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  }
};

export default appConfig;