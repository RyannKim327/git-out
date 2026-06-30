function removeVowels(text: string): string {
  return text.replace(/[aeiou]/gi, '');
}
const raw = "TypeScript is amazing!";
console.log(removeVowels(raw));
// ↳ "TypScrpt s mzng!"
function removeVowelsLoop(text: string): string {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u',
                          'A', 'E', 'I', 'O', 'U']);
  let result = '';
  for (const ch of text) {
    if (!vowels.has(ch)) result += ch;
  }
  return result;
}
const tests = [
  "Hello, world!",
  "AEIOUaeiou",
  "Rhythm",
  "Café",
  "",
];

tests.forEach(t => console.log(`"${t}" → "${removeVowels(t)}"`));
"Hello, world!" → "Hll, wrld!"
"AEIOUaeiou" → ""
"Rhythm" → "Rhythm"
"Café" → "Cf"
""
