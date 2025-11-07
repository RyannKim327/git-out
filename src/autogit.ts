// src/chaos-cron.ts
// A tiny, self-contained example that schedules a random task every 30 seconds.
// Run: npx ts-node chaos-cron.ts

import * as cron from 'node-cron';

// 1. A tiny in-memory “database” of fun facts.
const funFacts = [
  'Bananas are berries, but strawberries aren’t.',
  'A day on Venus is longer than its year.',
  'Octopuses have three hearts.',
  'Honey never spoils.',
];

// 2. A random task that we want to run on a schedule.
function randomTask(): void {
  const idx = Math.floor(Math.random() * funFacts.length);
  const fact = funFacts[idx];
  const now = new Date().toISOString();
  console.log(`[${now}] 🤖  Cron says: ${fact}`);
}

// 3. Schedule the task to run every 30 seconds.
//    Syntax: sec min hour day month weekday
cron.schedule('*/30 * * * * *', randomTask);

console.log('⏰  Cron job started. Press Ctrl-C to stop.');
