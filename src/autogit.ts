// src/chaos-cron.ts
// A tiny, self-contained example that schedules a random task every 30 seconds
// Run: npx ts-node src/chaos-cron.ts

import * as cron from 'node-cron';

/* ---------- helpers ---------- */
const randomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const log = (msg: string) => console.log(`[${new Date().toISOString()}] ${msg}`);

/* ---------- the random job ---------- */
const tasks = [
  () => log('🎲 Rolling dice… → ' + (Math.random() * 6 + 1).toFixed(2)),
  () => log('🔥 CPU temp simulation → ' + (40 + Math.random() * 25).toFixed(1) + '°C'),
  () => log('📈 Stock price → $' + (100 + Math.random() * 50).toFixed(2)),
  () => log('🌈 Random colour → ' + randomItem(['red', 'green', 'blue', 'mauve', 'cerulean'])),
];

const randomJob = () => randomItem(tasks)();

/* ---------- schedule ---------- */
// ┌───────────── second (optional)
// │ ┌───────────── minute
// │ │ ┌───────────── hour
// │ │ │ ┌───────────── day of month
// │ │ │ │ ┌───────────── month
// │ │ │ │ │ ┌───────────── day of week
// │ │ │ │ │ │
// * * * * * *
cron.schedule('*/30 * * * * *', randomJob, { scheduled: true });

log('🕒 Cron job registered – next run in ≤30 seconds. Press Ctrl-C to quit.');
