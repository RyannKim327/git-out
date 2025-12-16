function removeVowelsRegex(input: string): string {
  // /[aeiou]/gi  →  matches any vowel, case‑insensitive (g = global)
  return input.replace(/[aeiou]/gi, '');
}

// Example
const original = "Hello, TypeScript!";
const noVowels = removeVowelsRegex(original);
console.log(noVowels); // "Hll, TypScrpt!"
function removeVowelsFilter(input: string): string {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
  return input
    .split('')               // → array of characters
    .filter(ch => !vowels.has(ch)) // keep only non‑vowels
    .join('');               // back to a string
}

// Example
console.log(removeVowelsFilter("OpenAI is awesome!")); // "pn s wsm!"
function removeVowelsLoop(input: string): string {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
  let result = '';

  for (const ch of input) {
    if (!vowels.has(ch)) {
      result += ch;
    }
  }

  return result;
}

// Example
console.log(removeVowelsLoop("TypeScript is fun!")); // "TypScrpt s fn!"
declare global {
  interface String {
    withoutVowels(): string;
  }
}

String.prototype.withoutVowels = function (): string {
  return this.replace(/[aeiou]/gi, '');
};

// Usage
const phrase = "TypeScript loves you!";
console.log(phrase.withoutVowels()); // "TypScrpt lvs y!"
#!/usr/bin/env ts-node

function removeVowels(input: string): string {
  return input.replace(/[aeiou]/gi, '');
}

// Read from command line arguments or stdin
const args = process.argv.slice(2);
if (args.length) {
  console.log(removeVowels(args.join(' ')));
} else {
  // fallback: read from stdin
  process.stdin.setEncoding('utf8');
  let data = '';
  process.stdin.on('data', chunk => (data += chunk));
  process.stdin.on('end', () => console.log(removeVowels(data)));
}
$ ./removeVowels.ts "Hello World"
Hll Wrld
const noVowels = str.replace(/[aeiou]/gi, '');
