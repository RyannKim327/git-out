function removeVowels(str: string): string {
  return str.replace(/[aeiouAEIOU]/g, '');
}
const example = "Hello, World!";
console.log(removeVowels(example)); // "Hll, Wrld!"
function removeVowelsManual(str: string): string {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
  return Array.from(str)
    .filter(ch => !vowels.has(ch.toLowerCase()))
    .join('');
}
const VOWELS = new Set(['a', 'e', 'i', 'o', 'u'] as const);

function removeVowelsFast(str: string): string {
  const result: string[] = [];
  for (const ch of str) {
    if (!VOWELS.has(ch.toLowerCase())) {
      result.push(ch);
    }
  }
  return result.join('');
}
