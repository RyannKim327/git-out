// random-input-demo.ts
// ---------------------------------------------------
// A tiny demo that:
//   1️⃣ Reads a line of text from stdin.
//   2️⃣ Interprets it as a comma‑separated list of numbers.
//   3️⃣ Calculates the sum, the average, and the max value.
//   4️⃣ Prints the results in a friendly format.
// ---------------------------------------------------

import * as readline from 'readline';

// ---------- Helper functions ----------
/**
 * Parses a CSV string into an array of numbers.
 * Ignores empty entries and non‑numeric values.
 */
function parseNumbers(csv: string): number[] {
  return csv
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !isNaN(Number(s)))
    .map(Number);
}

/**
 * Returns basic statistics for an array of numbers.
 */
function stats(nums: number[]) {
  const sum = nums.reduce((a, b) => a + b, 0);
  const avg = nums.length ? sum / nums.length : 0;
  const max = nums.length ? Math.max(...nums) : NaN;
  const min = nums.length ? Math.min(...nums) : NaN;
  return { sum, avg, max, min };
}

// ---------- Main logic ----------
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  'Enter a list of numbers (comma‑separated, e.g. "3, 7, 2, 10"): ',
  (answer: string) => {
    const numbers = parseNumbers(answer);

    if (numbers.length === 0) {
      console.log('❌ No valid numbers were provided.');
    } else {
      const { sum, avg, max, min } = stats(numbers);
      console.log('\n📊  Statistics');
      console.log('---------------------------');
      console.log(`Numbers : [${numbers.join(', ')}]`);
      console.log(`Count   : ${numbers.length}`);
      console.log(`Sum     : ${sum}`);
      console.log(`Average : ${avg.toFixed(2)}`);
      console.log(`Min     : ${min}`);
      console.log(`Max     : ${max}`);
    }

    rl.close();
  },
);
npm install -g typescript ts-node   # global install, optional
ts-node random-input-demo.ts
Enter a list of numbers (comma-separated, e.g. "3, 7, 2, 10"):
