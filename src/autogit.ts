# npm
npm i node-cron
npm i -D @types/node-cron typescript ts-node

# or yarn
yarn add node-cron
yarn add -D @types/node-cron typescript ts-node
/**
 * cron-example.ts
 *
 * A tiny demo that runs three different cron jobs:
 *   1️⃣ Every minute – prints the current time.
 *   2️⃣ Every day at 02:30 AM – pretends to back‑up a DB.
 *   3️⃣ Every Monday at 09:00 AM – sends a reminder email.
 *
 * Run with:
 *   npx ts-node cron-example.ts
 */

import cron, { ScheduledTask } from 'node-cron';
import { format } from 'date-fns';

// ---------------------------------------------------------------------------
// Helper: a tiny wrapper that makes cron expressions a bit more readable.
// ---------------------------------------------------------------------------
type CronSchedule = string;

/**
 * Convert a human‑friendly description into a cron expression.
 *
 * @example
 *   every('5 minutes')   // => '*/5 * * * *'
 *   every('hour')        // => '0 * * * *'
 *   every('day at 02:30')// => '30 2 * * *'
 */
function every(description: string): CronSchedule {
  const [freq, ...rest] = description.trim().toLowerCase().split(' ');
  switch (freq) {
    case 'minute':
    case 'minutes':
      return `*/${rest[0] ?? 1} * * * *`;
    case 'hour':
    case 'hours':
      return `0 */${rest[0] ?? 1} * * *`;
    case 'day':
      // "day at HH:MM"
      const time = rest[1];
      if (!time) throw new Error('Provide a time like "day at 02:30"');
      const [hh, mm] = time.split(':').map(Number);
      return `${mm} ${hh} * * *`;
    case 'monday':
    case 'tuesday':
    case 'wednesday':
    case 'thursday':
    case 'friday':
    case 'saturday':
    case 'sunday':
      // "monday at HH:MM"
      const dayIdx = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ].indexOf(freq);
      const t = rest[1];
      if (!t) throw new Error('Provide a time like "monday at 09:00"');
      const [h, m] = t.split(':').map(Number);
      return `${m} ${h} * * ${dayIdx}`;
    default:
      throw new Error(`Unsupported schedule description: "${description}"`);
  }
}

// ---------------------------------------------------------------------------
// Job definitions (typed for clarity)
// ---------------------------------------------------------------------------
type Job = {
  /** Human‑readable description – used only for logging */
  description: string;
  /** Cron expression that node‑cron understands */
  schedule: CronSchedule;
  /** The async function that will be executed */
  handler: () => Promise<void> | void;
};

/** Example jobs */
const jobs: Job[] = [
  {
    description: 'Every minute – log current time',
    schedule: every('minute'),
    handler: () => {
      console.log(`[${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}] Tick!`);
    },
  },

  {
    description: 'Every day at 02:30 – fake DB backup',
    schedule: every('day at 02:30'),
    handler: async () => {
      console.log('🔧 Starting DB backup...');
      // Simulate a long‑running task
      await new Promise((res) => setTimeout(res, 2_000));
      console.log('✅ DB backup completed.');
    },
  },

  {
    description: 'Every Monday at 09:00 – send reminder email',
    schedule: every('monday at 09:00'),
    handler: async () => {
      console.log('📧 Sending weekly reminder email...');
      // Here you could call your email service, e.g. SendGrid, SES, etc.
      await new Promise((res) => setTimeout(res, 500));
      console.log('✅ Reminder email sent.');
    },
  },
];

// ---------------------------------------------------------------------------
// Scheduler bootstrap
// ---------------------------------------------------------------------------
const scheduledTasks: ScheduledTask[] = [];

function startAllJobs() {
  console.log('🚀 Starting cron scheduler...');
  for (const job of jobs) {
    const task = cron.schedule(
      job.schedule,
      async () => {
        try {
          await job.handler();
        } catch (err) {
          console.error(
            `❌ Error in job "${job.description}":`,
            (err as Error).message,
          );
        }
      },
      {
        // `scheduled: true` means the job starts immediately.
        scheduled: true,
        // `timezone` is optional – default is the server’s local TZ.
        timezone: 'UTC',
      },
    );

    console.log(
      `✅ Scheduled "${job.description}" → ${job.schedule} (UTC)`,
    );
    scheduledTasks.push(task);
  }
}

/** Graceful shutdown – stops all cron jobs before the process exits */
function shutdown() {
  console.log('\n🛑 Shutting down cron scheduler...');
  for (const task of scheduledTasks) {
    task.stop();
  }
  console.log('✅ All jobs stopped. Bye!');
  process.exit(0);
}

// Listen for termination signals (Ctrl‑C, Docker stop, etc.)
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Kick‑off
startAllJobs();
npx ts-node cron-example.ts
🚀 Starting cron scheduler...
✅ Scheduled "Every minute – log current time" → */1 * * * * (UTC)
✅ Scheduled "Every day at 02:30 – fake DB backup" → 30 2 * * * (UTC)
✅ Scheduled "Every Monday at 09:00 – send reminder email" → 0 9 * * 1 (UTC)
[2025-12-29 14:03:00] Tick!
[2025-12-29 14:04:00] Tick!
...
