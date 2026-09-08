// cronDemo.ts
// ──────────────────────────────────────────────
// Simple TS + node‑cron demo.  Every minute,
// the job prints a timestamp and a random number.
//
// Requirements:
//   npm i node-cron @types/node-cron
//
// Run with:
//   npx ts-node cronDemo.ts
// ‒ or compile (npx tsc) and exec (node cronDemo.js)
// ──────────────────────────────────────────────

import cron from 'node-cron';

/**
 * Helper that gives us a nicely formatted timestamp.
 */
const now = () => new Date().toLocaleString();

/**
 * The task that will run according to the cron schedule.
 * We generate a random integer between 1 and 1000.
 */
const task = () => {
  const rand = Math.floor(Math.random() * 1000) + 1;
  console.log(`[${now()}] Random number: ${rand}`);
};

/**
 * Schedule the job.
 * Cron expression: '* * * * *'
 * └─ minute (0‑59)
 *
 * The job triggers at the start of every minute.
 */
cron.schedule('* * * * *', task, {
  scheduled: true,
  timezone: 'UTC',     // change to your local timezone if needed
});

console.log('Cron job scheduled: every minute at UTC. Press ^C to exit.');
[2026-06-17 12:34:00] Random number: 827
[2026-06-17 12:35:00] Random number: 314
