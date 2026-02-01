// src/scheduler.ts
import { schedule, Job } from 'node-cron';
import { randomInt } from 'crypto';

// Helper: format the current date/time nicely
const fmtDate = (date: Date): string => {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
         `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

// Cron expression – every 5 minutes, on the minute.
// (Syntax: `m h dom mon dow`)
// Example: 0 12 * * * → every day at 12:00.
const cronExpr = '*/5 * * * *';

const job: Job = schedule(cronExpr, () => {
  const now = new Date();
  const rand = randomInt(1_000_000); // 0 <= rand < 1,000,000
  console.log(`[${fmtDate(now)}] Random number: ${rand}`);
}, {
  scheduled: true, // start scheduling immediately
  timezone: 'UTC'  // adjust if you need a different zone
});

// Optional: make the process stay alive but not block exit
job.task?.unref?.();

// If you ran the script normally (`node src/scheduler.js` after TS‑compile),
// the job will keep running. Exit manually when you're done.
