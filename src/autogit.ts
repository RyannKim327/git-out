npm i node-cron @types/node
// src/randomPing.ts
import cron from 'node-cron';

const messages = ['Ping!', 'Pong!', 'Boing!', 'Beep!', 'Boop!', 'Zap!'];

// ┌───────────── second (optional)
// │ ┌───────────── minute
// │ │ ┌───────────── hour
// │ │ │ ┌───────────── day of month
// │ │ │ │ ┌───────────── month
// │ │ │ │ │ ┌───────────── day of week
// │ │ │ │ │ │
// │ │ │ │ │ │
cron.schedule('*/30 * * * * *', () => {
  const msg = messages[Math.floor(Math.random() * messages.length)];
  console.log(`[${new Date().toISOString()}] ${msg}`);
});

console.log('Cron job started… (Ctrl-C to stop)');
npx ts-node src/randomPing.ts
