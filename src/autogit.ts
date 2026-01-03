// random.ts
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(prompt: string): Promise<string> {
  return new Promise(res => rl.question(prompt, res));
}

(async () => {
  const name = await ask('What is your name? ');
  const age  = Number(await ask('How old are you? '));

  const lucky = Math.floor(Math.random() * 100) + age;
  console.log(`\nHello ${name}! Your lucky number today is ${lucky}.`);

  rl.close();
})();
