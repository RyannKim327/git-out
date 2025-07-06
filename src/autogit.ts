import cron from 'node-cron';

// Schedule a task to run every minute
const task = cron.schedule('* * * * *', () => {
  const now = new Date();
  console.log(`Task executed at ${now.toISOString()}`);
});

// Start the scheduled task
task.start();
npm install node-cron @types/node
tsc cron-example.ts
node cron-example.js
