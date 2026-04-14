// ---------------------------------------------------------------------------
//  cron‑example.ts
// ---------------------------------------------------------------------------

// 1️⃣  Install the dependencies first (run once):
//     npm install node-cron
//
// 2️⃣  If you’re compiling TypeScript with tsc, add the type definitions:
//     npm install --save-dev @types/node-cron
//
// 3️⃣  Run this file with ts-node for instant feedback:
//     npx ts-node cron‑example.ts
//
// ---------------------------------------------------------------------------

import cron, { CronJob } from 'node-cron';

/**
 * A tiny helper to show that the job really ran.
 * You could replace this with whatever real work you need.
 */
const performScheduledWork = (): void => {
  const now = new Date().toISOString();
  console.log(`[${now}] The scheduled task has executed.`);
};

/**
 * Create a CronJob that triggers every minute.
 *
 * The cron expression '* * * * *' means:
 *   ┌───────────── minute (0 - 59)
 *   │ ┌───────────── hour (0 - 23)
 *   │ │ ┌───────────── day of month (1 - 31)
 *   │ │ │ ┌───────────── month (1 - 12)
 *   │ │ │ │ ┌───────────── day of week (0 - 6) (Sunday to Saturday)
 *   │ │ │ │ │
 *   │ │ │ │ │
 *   * * * * *
 *
 * Feel free to tweak the expression to your own schedule.
 */
const scheduledJob: CronJob = cron.schedule(
  '* * * * *',
  () => {
    try {
      performScheduledWork();
    } catch (e) {
      console.error('Unexpected error in cron job:', e);
    }
  },
  {
    scheduled: true,   // start automatically
    timezone: 'UTC',   // use UTC by default; change if you need a different zone
  }
);

// Optional: if you want to stop the job after, say, 5 executions
let counter = 0;
scheduledJob.setTimeZone('UTC'); // ensures time zone consistency

scheduledJob.on('scheduled', () => {
  console.log('Cron job started.');
});

scheduledJob.start(); // Explicitly start, even though scheduled:true

// Clean exit after a short run (e.g., 5 minutes)
setTimeout(() => {
  console.log('Stopping cron job and exiting.');
  scheduledJob.stop();
  process.exit(0);
}, 5 * 60 * 1000);
