// file: square.ts
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Give me a number: ", (answer: string) => {
  const num = Number(answer);

  if (!isNaN(num)) {
    console.log(`⚡ ${num} × ${num} = ${num * num}`);
  } else {
    console.log("😕 That wasn’t a valid number!");
  }
  rl.close();
});
