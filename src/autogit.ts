// src/cronJob.ts

import cron from 'node-cron';

// Helper: generate a random number between 1 and 100
const randomInt = () => Math.floor(Math.random() * 100) + 1;

// The job – runs every minute (`* * * * *`)
const job = cron.schedule('* * * * *', () => {
  const now = new Date().toISOString();
  const rand = randomInt();
  console.log(`[${now}] Random number: ${rand}`);
  // You can place any logic here (DB ops, API calls, etc.)
});

// Start the job
job.start();
console.log('Cron job scheduled: every minute.');
# 1️⃣ Create a new TS project (if you haven't already)
mkdir cron-demo && cd cron-demo
npm init -y

# 2️⃣ Install the required packages
npm i node-cron
npm i -D typescript @types/node

# 3️⃣ Add a tsconfig.json (basic version)
cat <<'EOF' > tsconfig.json
{
  "compilerOptions": {
    "target": "es2019",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src"]
}
EOF

# 4️⃣ Place the `cronJob.ts` file in ./src
# 5️⃣ Compile and run
npx tsc
node dist/cronJob.js
