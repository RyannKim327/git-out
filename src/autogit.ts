// random-cron.ts
// ----------
// Requires:
//   npm install node-cron
//   npm install --save-dev @types/node-cron   (optional if you want type safety)
// ----------
import cron from 'node-cron';

/**
 * Handy helper that returns a random integer in [min, max] inclusive.
 */
function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * A tiny random “quote” pool. Feel free to replace these with your own.
 */
const QUOTES: string[] = [
  "Do not wait to strike till the iron is hot; but make it hot by striking.",
  "All that we see or seem is but a dream within a dream.",
  "Noise is bliss when you’re chasing a dream.",
  "In the middle of difficulty lies opportunity.",
  "The only limit to our realization of tomorrow is our doubts about today."
];

/**
 * Pick a random quote from `QUOTES`.
 */
function getRandomQuote(): string {
  const idx = randInt(0, QUOTES.length - 1);
  return QUOTES[idx];
}

/**
 * Pick a random time (hour/minute) so that the job will fire at a different
 * spot each day. These are UTC values in the cron string.
 */
function generateRandomCronExpr(): string {
  const hour = randInt(0, 23);
  const minute = randInt(0, 59);
  // e.g. "14 3 * * *" → 3:14 AM UTC every day
  return `${minute} ${hour} * * *`;
}

/**
 * Launch a cron job that runs at the generated random time.
 */
function scheduleDailyQuote() {
  const cronExpr = generateRandomCronExpr();
  console.log(`Scheduling daily quote at *${cronExpr}* (UTC).`);

  cron.schedule(cronExpr, () => {
    const msg = getRandomQuote();
    const time = new Date().toISOString();
    console.log(`[${time}] Random quote: ${msg}`);
  });
}

scheduleDailyQuote();
# 1. Install deps
npm install --save node-cron
# Optional typings
npm install --save-dev @types/node-cron

# 2. Compile (if you’re using tsc)
tsc random-cron.ts

# 3. Run
node random-cron.js
