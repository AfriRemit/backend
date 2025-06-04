import createApp from './app';
import environment from './config/environment';

/**
 * Start the Express server
 */
const startServer = async (): Promise<void> => {
  try {
    const app = createApp();
    const PORT = environment.PORT;
    
    app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT} in ${environment.NODE_ENV} mode`);
      console.log(`✓ API endpoint: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('✗ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('✗ Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('✗ Unhandled Rejection:', error);
  process.exit(1);
});

// Start the server
startServer();