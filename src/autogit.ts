// src/cronJob.ts
import * as cron from 'node-cron';
import { exec } from 'child_process';

// Simple helper that returns a random joke (you can replace it with anything)
function getRandomJoke(): string {
  const jokes = [
    'Why did the type-checker break up with the compiler? Too many scary `unknowns`.',
    'I asked my code to stop being a bug. It said “I don’t want to be a feature in a future release.”',
    'Python gave Java a pep talk and said: “You can do anything you set your mind to – what about you?”',
  ];
  return jokes[Math.floor(Math.random() * jokes.length)];
}

// This job:
cron.schedule('* * * * *', () => {          // Runs every minute
  const joke = getRandomJoke();
  console.log(`[${new Date().toISOString()}] - Joke: ${joke}`);

  // Example of how you might trigger a system command using Cron
  exec('echo "Cron job ran successfully"', (err, stdout, stderr) => {
    if (err) {
      console.warn(`Error while executing command: ${err.message}`);
      return;
    }
    console.log(`Command output: ${stdout.trim()}`);
  });
});

console.log('🚀 Cron job scheduler started. Press Ctrl+C to exit.');
