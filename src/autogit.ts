// src/chaoticScheduler.ts
// A tiny, zero-dependency example that schedules a random task
// to run at a random minute every hour using the classic
// "node-cron" package.

import * as cron from 'node-cron';

// 1. A tiny in-memory store so we can see some state changing.
let chaosCounter = 0;

// 2. A totally useless task that mutates the counter.
function doSomethingChaotic(): void {
  const dice = Math.floor(Math.random() * 6) + 1;
  chaosCounter += dice;
  console.log(`[${new Date().toISOString()}] Rolled a ${dice} — chaosCounter is now ${chaosCounter}`);
}

// 3. Pick a random minute (0-59) every hour.
const randomMinute = Math.floor(Math.random() * 60);
const expression = `${randomMinute} * * * *`;

// 4. Schedule it.
cron.schedule(expression, doSomethingChaotic, {
  scheduled: true,
  timezone: 'UTC',
});

console.log(`🔔 Scheduled chaotic task at minute ${randomMinute} of every hour (UTC).`);
