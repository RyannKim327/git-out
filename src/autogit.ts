/**
 * Removes all a, e, i, o, u (both lowercase and uppercase) from the input.
 */
function removeVowels(input: string): string {
  return input.replace(/[aeiou]/gi, '');
}

// Example
const raw = "Hello, World! 123";
const clean = removeVowels(raw);
console.log(clean); // "Hll, Wrld! 123"
function removeVowelsManual(input: string): string {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
  return input
    .split('')
    .filter(ch => !vowels.has(ch.toLowerCase()))
    .join('');
}
