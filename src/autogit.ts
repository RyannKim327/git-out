import cron from 'node-cron';

// Schedule a task to run every 5 minutes
const task = cron.schedule('*/5 * * * *', () => {
  console.log(`Task executed at: ${new Date().toISOString()}`);
  // Your logic here, e.g., API calls, database cleanup, etc.
  performScheduledWork();
});

// Function that contains the actual work to be done
function performScheduledWork() {
  // Example: Log some data or perform some operation
  const currentTime = new Date();
  console.log(`Performing scheduled work at ${currentTime.toLocaleTimeString()}`);
  
  // Example: You could add API calls, file operations, etc. here
  // fetchDataFromAPI();
  // cleanupOldFiles();
}

// Start the cron job
console.log('Cron job started. Task will run every 5 minutes.');

// Gracefully stop the cron job when the process is terminated
process.on('SIGINT', () => {
  console.log('Stopping cron job...');
  task.stop();
  process.exit(0);
});

// Optional: List all active jobs
console.log(`Active cron jobs: ${cron.getTasks().size}`);
npm install node-cron
npm install --save-dev @types/node  # for TypeScript types
