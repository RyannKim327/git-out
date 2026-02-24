// fortune.ts
import { createInterface } from 'readline';

// Set up a simple REPL‑style prompt
const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🃏 Welcome to the Random Fortune Machine!');

// Ask the user for a number
rl.question('Enter a number (0–9) and press Enter: ', (answer) => {
  // Try to parse the input as an integer
  const num = parseInt(answer.trim(), 10);

  if (isNaN(num) || num < 0 || num > 9) {
    console.log('❌ That’s not a valid single digit between 0 and 9.');
  } else {
    // Pick a fortune from a tiny list
    const fortunes = [
      "You'll find a penny on the sidewalk.",
      "A surprise call will brighten your day.",
      "Today is a great day to start learning something new.",
      "You’ll discover a hidden talent for drawing.",
      "A forgotten receipt will pop up in your inbox.",
      "A random act of kindness will return to you.",
      "You’ll taste your favorite food in an unexpected way.",
      "A new friendship is just a conversation away.",
      "You’ll hit a traffic light and notice your neighbor’s cat.",
      "Today you will finally finish that project you’ve shelved."
    ];

    console.log(`🔮 Fortune for ${num}: ${fortunes[num]}`);
  }

  rl.close();
});
