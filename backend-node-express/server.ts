// TODO: Express server entry point
// Responsibility: Initialize and start the application

import dotenv from 'dotenv';
dotenv.config();

import app from './app';
console.log(`[Server] Starting...`, process.env.PORT);
const PORT = Number(process.env.PORT) || 3001;

// TODO: Graceful shutdown handlers
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  process.exit(0);
});

// TODO: Start server
app.listen(PORT, () => {
  console.log(`[Server] Running on port ${PORT}`);
  console.log(`[Server] Environment: ${process.env.NODE_ENV}`);
});
