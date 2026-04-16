// root-level server.js

// Load environment variables
require('dotenv').config();

// Import DB connection and app
const connectDB = require('./src/config/db');
const app = require('./src/app');

const PORT = parseInt(process.env.PORT || 5000, 10);
const HOST = '0.0.0.0';

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, HOST, () => {
      console.log(`LuminEd LMS API running on http://${HOST}:${PORT}`);
    });

    server.on('error', (error) => {
      console.error('Server error:', error);
      process.exit(1);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
