npm install node-cron
npm install typescript @types/node --save-dev
import cron from 'node-cron';

// Schedule a task to run every minute
const task = cron.schedule('* * * * *', () => {
    console.log('Task is running every minute');
});

// Start the task
task.start();

// Optional: Stop the task after 5 minutes
setTimeout(() => {
    task.stop();
    console.log('Task has been stopped');
}, 5 * 60 * 1000);
npx tsc cronJob.ts
node cronJob.js
