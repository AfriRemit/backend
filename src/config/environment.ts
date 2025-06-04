import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Environment variables
const environment = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  RPC_URL: process.env.RPC_URL,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
  TOKEN_ADDRESS: process.env.TOKEN_ADDRESS,
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*'
};

// Validate required environment variables
const requiredEnvVars = ['RPC_URL', 'PRIVATE_KEY', 'CONTRACT_ADDRESS', 'TOKEN_ADDRESS'];
const missingEnvVars = requiredEnvVars.filter(envVar => !environment[envVar as keyof typeof environment]);

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

export default environment;