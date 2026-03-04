// schedule.ts
import cron from 'node-cron';

let runCount = 0;
const maxRuns = 5;

// Pick a playful string at random each time the job fires.
const messages = [
  "🍕 Time for a pizza break!",
  "🐱‍🏍 Speedy coding vibes!",
  "🧐 Did you know: A group of flamingos is called a flamboyance?",
  "🚀 Launching into the cosmos…",
  "🔮 Future content will appear here!"
];

const job = cron.schedule('* * * * *', () => {
  // Bot says something random
  const msg = messages[Math.floor(Math.random() * messages.length)];
  console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);

  runCount += 1;
  if (runCount >= maxRuns) {
    console.log('Stopping the cron job after 5 runs.');
    job.stop();
  }
}, {
  scheduled: true,
  timezone: "UTC"
});

console.log('Cron job started—will run every minute up to 5 times.');
# 1. Init a barebones project if you haven’t already
npm init -y

# 2. Install the cron package and types for Node
npm i node-cron
npm i -D @types/node @types/node-cron typescript ts-node

# 3. Compile and run
npx ts-node schedule.ts
[12:00:00 AM] 🚀 Launching into the cosmos…
