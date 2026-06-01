// src/index.ts
import { CronJob } from 'cron';

/**
 * This job fires every minute (the pattern '* * * * *' means:
 *  ────── minute   0-59
 *  ───── hour     0-23
 *  ──── day of month 1-31
 *  ── month    1-12
 *  ───── day of week 0-7 (0/7 = Sunday)
 */
const randomJob = new CronJob(
  '* * * * *',              // cron syntax
  () => {
    const now = new Date();
    const rand = Math.floor(Math.random() * 100); // 0‑99
    console.log(`[${now.toLocaleTimeString()}] Random number: ${rand}`);
  },
  null,
  true,                     // start the job right after creation
  'America/New_York'        // optional timezone
);

// keep the Node process alive—if you’re in an express server or other
// long‑running app you won’t need this manual loop.
setInterval(() => {}, 1000);
# Install dependencies
npm install typescript cron @types/node
# Optional: add a tsconfig.json if you don’t have one yet
npx tsc --init

# Compile (or just run with ts-node)
npx ts-node src/index.ts
[10:05:00 AM] Random number: 42
[10:06:00 AM] Random number: 7
...
