mkdir cron-example
cd cron-example
npm init -y
npm install typescript ts-node @types/node node-cron
touch cronJob.ts
import cron from 'node-cron';

// Schedule a task to run every minute
const task = cron.schedule('* * * * *', () => {
    const currentDate = new Date();
    console.log(`Task is running every minute. Current date and time: ${currentDate}`);
});

// Start the cron task
task.start();

console.log('Cron job has been started. It will log the current date and time every minute.');

// Optionally, stop the task after a certain time (for demonstration)
setTimeout(() => {
    task.stop();
    console.log('Cron job has been stopped.');
}, 300000); // Stops after 5 minutes
npx ts-node cronJob.ts
