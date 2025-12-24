// random.ts
// A tiny CLI toy that greets a user with a random emoji and a fortune cookie message.

import * as readline from "readline";

// --- utilities -------------------------------------------------------------

const randomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const emojis = ["🌟", "🍀", "🎲", "🦄", "🔮", "🌈", "🚀", "🎈"];
const fortunes = [
  "A beautiful, smart, and loving person will be coming into your life.",
  "A dubious friend may be an enemy in camouflage.",
  "A faithful friend is a strong defense.",
  "A fresh start will put you on your way.",
  "A golden egg of opportunity falls into your lap this month.",
  "A good time to finish up old tasks.",
  "A lifetime of happiness lies ahead of you.",
];

// --- core -------------------------------------------------------------------

function ask(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

// --- main -------------------------------------------------------------------

(async () => {
  const name = await ask("What is your name? ");
  if (!name) {
    console.log("Maybe next time! 👋");
    process.exit(0);
  }

  console.log(`\nHello, ${name}! ${randomItem(emojis)}`);
  console.log(`Fortune cookie says: “${randomItem(fortunes)}”`);
})();

/* ---------------------------------------------------------------------------
Run it:
  npx ts-node random.ts
--------------------------------------------------------------------------- */
