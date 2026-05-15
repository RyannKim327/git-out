/*  random-cron-example.ts
 *
 *  Requires:
 *    npm install cron chalk
 *  Compile with:
 *    tsc random-cron-example.ts --module commonjs
 *  Run with:
 *    node random-cron-example.js
 */

import { CronJob } from "cron";
import chalk from "chalk";

// A function that does something "random enough" each time it runs.
function generateMagicNumber(): number {
  // Pick a pseudo‑random integer between 1 and 100
  return Math.floor(Math.random() * 100) + 1;
}

// Define a cron job that fires every minute.
// The schedule string "`* * * * *`" means: every minute, every hour, every day ...
const job = new CronJob(
  // Every minute
  "* * * * *",
  () => {
    const now = new Date();
    const magic = generateMagicNumber();
    console.log(
      `${chalk.green(now.toISOString())} → Magic number: ${chalk.yellow(
        magic
      )}`
    );
  },
  null, // onComplete callback (unused)
  true, // start the job right away
  "America/New_York" // time zone
);

// Graceful shutdown
process.on("SIGINT", () => {
  console.log(chalk.red("\nStopping the cron job..."));
  job.stop();
  process.exit(0);
});

console.log(
  chalk.blue(
    "Random cron job started. It will output a magic number every minute."
  )
);
