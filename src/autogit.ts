// src/coffeeReminder.ts
import cron from 'node-cron';

// Random message pool
const messages = [
  'Time for a ☕ break!',
  'Your brain needs caffeine—go grab a coffee!',
  'Coffee o’clock: the most productive part of the day.',
  'Bean there, done that—still need coffee.',
  'Espresso yourself—take a break!'
];

function randomMessage(): string {
  return messages[Math.floor(Math.random() * messages.length)];
}

// ┌───────────── minute (0-59)
// │ ┌───────────── hour (0-23)
// │ │ ┌───────────── day of month (1-31)
// │ │ │ ┌───────────── month (1-12)
// │ │ │ │ ┌───────────── day of week (0-7) (0 or 7 is Sun)
// │ │ │ │ │
// 0 9 * * 1-5   → 09:00 Monday-Friday
cron.schedule('0 9 * * 1-5', () => {
  console.log(`[${new Date().toISOString()}] ${randomMessage()}`);
});

console.log('Coffee reminder scheduler started (09:00 on weekdays).');
npm install node-cron @types/node-cron ts-node
npx ts-node src/coffeeReminder.ts
