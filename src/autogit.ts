function reverseString(str: string): string {
  // 1️⃣ Convert the string to an array of characters
  // 2️⃣ Reverse the array
  // 3️⃣ Join it back into a string
  return str.split('').reverse().join('');
}

// Example
console.log(reverseString('hello')); // "olleh"
function reverseStringUnicode(str: string): string {
  // Spread operator splits the string into an array of *Unicode grapheme clusters*
  // (thanks to the built‑in iterator that respects surrogate pairs).
  return [...str].reverse().join('');
}

// Example
console.log(reverseStringUnicode('👩‍💻🚀')); // "🚀👩‍💻"
function reverseStringLoop(str: string): string {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

// Example
console.log(reverseStringLoop('TypeScript')); // "tpircSyepT"
const reverseStringReduce = (str: string): string =>
  str.split('').reduce((rev, ch) => ch + rev, '');

console.log(reverseStringReduce('reduce')); // "ecuder"
declare global {
  interface String {
    reverse(): string;
  }
}

String.prototype.reverse = function (): string {
  // Choose the Unicode‑safe version here
  return [...this].reverse().join('');
};

// Usage
console.log('hello world'.reverse()); // "dlrow olleh"
/**
 * Reverses a string.
 * Handles surrogate pairs (emoji, many non‑ASCII characters) correctly.
 *
 * @param str - The string to reverse.
 * @returns The reversed string.
 */
function reverseStringUnicode(str: string): string {
  return [...str].reverse().join('');
}

// Demo
const inputs = [
  'TypeScript',
  '😀😃😄😁',
  'mañana',          // contains ñ
  'e\u0301',         // "e" + combining acute accent
  '🇺🇸🇨🇦',           // flag emojis (multiple code points)
];

inputs.forEach(s => console.log(`${s} → ${reverseStringUnicode(s)}`));
TypeScript → tpircSyepT
😀😃😄😁 → 😁😄😃😀
mañana → anañam
é → é
🇺🇸🇨🇦 → 🇨🇦🇺🇸
// Quick, Unicode‑safe
const reversed = [...myString].reverse().join('');
