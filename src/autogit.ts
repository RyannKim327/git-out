import cron from 'node-cron';

// Task 1: Runs every minute
const task1 = cron.schedule('* * * * *', () => {
  console.log('Running task every minute:', new Date().toLocaleTimeString());
});

// Task 2: Runs every day at 10:30 AM
const task2 = cron.schedule('30 10 * * *', () => {
  console.log('Running daily task at 10:30 AM');
  sendDailyReport(); // You would implement this function
});

// Task 3: Runs every weekday (Mon-Fri) at 8:00 AM
const task3 = cron.schedule('0 8 * * 1-5', () => {
  console.log('Running weekday morning task');
  startDailyMeeting(); // Example function
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Stopping cron jobs...');
  task1.stop();
  task2.stop();
  task3.stop();
  process.exit();
});

console.log('Cron jobs started. Press Ctrl+C to exit.');

// Example functions (implement these as needed)
function sendDailyReport() {
  // Email logic or API call
}

function startDailyMeeting() {
  // Notify team or trigger meeting
}
npm install node-cron @types/node typescript ts-node
npx ts-node cron-example.ts
* * * * * *
| | | | | |
| | | | | day of week (0 - 7) (0 and 7 are Sunday)
| | | | month (1 - 12)
| | | day of month (1 - 31)
| | hour (0 - 23)
| minute (0 - 59)
second (0 - 59) [optional]
