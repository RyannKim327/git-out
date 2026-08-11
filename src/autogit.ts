// hello.ts
import * as readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function ask(question: string): Promise<string> {
  return new Promise(resolve => rl.question(question, answer => resolve(answer.trim())))
}

async function main() {
  const name = await ask('What’s your name? ')
  const favNum = await ask('What’s your favorite number? ')
  
  const num = parseInt(favNum, 10)
  const isEven = !isNaN(num) ? num % 2 === 0 : false

  console.log(`\nHello, ${name}!`);
  console.log(`Your favorite number is ${favNum}`);
  console.log(`It’s ${isEven ? 'even' : 'odd'}!`);

  rl.close()
}

main()
tsc hello.ts   # compile to JavaScript
node hello.js
