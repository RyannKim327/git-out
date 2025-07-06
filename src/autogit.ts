import cron from 'node-cron';

// Schedule a task to run every minute
const task = cron.schedule('* * * * *', () => {
  const now = new Date();
  console.log(`Task executed at: ${now.toISOString()}`);
});

// Start the scheduled task
task.start();

// Optional: Handle process termination to gracefully stop the cron job
process.on('SIGINT', () => {
  console.log('Gracefully shutting down...');
  task.stop();
  process.exit();
});
npm init -y
npm install typescript @types/node node-cron
npx tsc --init
npx tsc cron-example.ts
node cron-example.js
