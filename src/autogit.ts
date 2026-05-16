/*  0001‑random‑ts‑with‑input.ts  */

import * as readline from 'node:readline';

// set up an interface that pulls from stdin and pushes to stdout
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

console.log("Hey there! 🤖  What’s the *odd‑est* dish you’ve ever tried?");
rl.question('> ', (dish) => {
  // a small random‑ish twist: pick a random‑word to shout at the dish
  const reactions = [
    'delicious',
    'indescribable',
    'surprisingly tasty',
    'flat',
    'legendary',
    'not for the faint‑hearted',
    'mind‑blowing',
  ];
  const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];

  console.log(`\nI heard you enjoyed a ${randomReaction} ${dish} ✨`);

  // one more quick twist: ask for a rating, then show a playful summary
  rl.question('\nRate it 1‑10: ', (rateStr) => {
    const rating = parseInt(rateStr, 10) || 0;
    const verdict = rating >= 7 ? 'Chef‑approved!' : 'Better luck next time!';
    console.log(`\nYou rated it a ${rating}/10... ${verdict}`);
    rl.close();
  });
});
