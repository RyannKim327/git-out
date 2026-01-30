// ---------------------------------------------------------
//  FunRandomCron.ts
//  A tiny demo that shows how to:
//   • import node‑cron with types
//   • schedule a repeating job
//   • cancel a job on demand
//   • use a more powerful CRON expression
//   • log the next run time every time it fires
// ---------------------------------------------------------

import cron, { ScheduledTask } from 'node‑cron';
import { format } from 'date‑fns';

// This job runs every 10 seconds—just to keep the console fire‑breathing.
// In a real app you could do backups, recompute stats, notify users, etc.
const repeatEveryTenSeconds: ScheduledTask = cron.schedule(
  '*/10 * * * * *',                // <seconds> <minutes> <hours> <day> <month> <dow>
  () => {
    const now = new Date();
    console.log(`[${format(now, 'HH:mm:ss.SSS')}] 10‑second heartbeat!`);
    // Do your real work here.
  },
  { scheduled: true }              // starts immediately
);

// Also throw in a “Monday at 04:35” job just to show another flavour.
const mondayMorning: ScheduledTask = cron.schedule(
  '35 4 * * 1',                    // minute hour day-of-month month day-of-week
  () => {
    console.log(`🎉 Monday Special – It’s 04:35!`);
  },
  { scheduled: true, timezone: 'America/New_York' } // time‑zone support
);

// Show next run times.  Handy for debugging.
function displayNextRun(job: ScheduledTask, name: string) {
  console.log(` → ${name} next run at ${format(job.nextDates().toDate(), 'yyyy‑MM‑dd HH:mm:ss')}`);
}
displayNextRun(repeatEveryTenSeconds, 'Heartbeat');
displayNextRun(mondayMorning, 'Mon‑4:35 AM');

// ---------------------------------------------------------
//  Graceful shutdown inside this demo
// ---------------------------------------------------------
const shutdown = () => {
  console.log('\n→ Shutting down cron jobs gracefully...');
  repeatEveryTenSeconds.stop();
  mondayMorning.stop();
  console.log('→ All job timers cleared. Bye!');
  process.exit(0);
};

// In a real app you’d hook this into SIGINT, SIGTERM, etc.
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
# 1️⃣ Install the runtime dependencies
npm install node-cron date-fns

# 2️⃣ Add TypeScript types, optional but handy
npm install -D typescript @types/node-cron @types/date-fns

# 3️⃣ Compile + run
npx tsc FunRandomCron.ts
node FunRandomCron.js
npx ts-node FunRandomCron.ts
