// cron-demo.ts
import { CronJob } from 'cron';
import * as dotenv from 'dotenv';

dotenv.config(); // optional – pulls cron expression from .env

/**
 * A simple scheduled task that
 * • runs every minute (or whatever pattern you set)
 * • prints a timestamp
 * • gracefully handles potential errors
 */
const job = new CronJob(
  // Default cron date string: every minute of every hour of every day
  process.env.CRON_EXPRESSION || '* * * * *',
  () => {
    const now = new Date().toISOString();
    console.log(`[${now}] Tick – cron job fired!`);
  },
  // onComplete – fires when the job finishes its last scheduled run (not used here)
  null,
  // start immediately
  true,
  // timezone – string like 'America/New_York'
  process.env.TZ || 'UTC',
);

job.on('error', (err) => {
  console.error(`❌ Cron job encountered an error: ${err.message}`);
});

process.once('SIGINT', () => {
  console.log('\n🛑 Shutting down cron job gracefully...');
  job.stop();
  process.exit(0);
});

console.log(`✅ Cron job started with pattern: ${job.cronTime.source}`);
✅ Cron job started with pattern: * * * * *
[2026-02-15T12:00:00.000Z] Tick – cron job fired!
[2026-02-15T12:01:00.000Z] Tick – cron job fired!
…
