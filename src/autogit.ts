import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(q: string): Promise<string> {
  return new Promise(resolve => rl.question(q, resolve));
}

async function main() {
  const color = await ask('Enter a color: ');
  const animal = await ask('Enter an animal: ');
  rl.close();
  console.log(`Roses are ${color}, ${animal} leaps through the ${color} moon.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
// Assumes HTML:
// <input id="userInput" />
// <button id="process">Process</button>
// <div id="result"></div>

document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector<HTMLInputElement>('#userInput');
  const btn = document.querySelector<HTMLButtonElement>('#process');
  const out = document.querySelector<HTMLDivElement>('#result');

  btn?.addEventListener('click', () => {
    const v = input?.value ?? '';
    const len = v.length;
    const vowels = (v.match(/[aeiou]/gi) || []).length;
    out!.textContent = `Input: "${v}" | chars: ${len} | vowels: ${vowels}`;
  });
});
