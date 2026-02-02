/**
 * Return a copy of `text` with all a, e, i, o, u removed.
 * @param text – The input string.
 * @returns The string with vowels gone.
 */
export function removeVowels(text: string): string {
  // `[aeiou]` matches any vowel, and `gi` makes it global & case‑insensitive.
  return text.replace(/[aeiou]/gi, '');
}
console.log(removeVowels('Hello, World!')); // "Hll, Wrld!"
console.log(removeVowels('TypeScript'));     // "TpScrt"
export function removeVowels(text: string, includeY = false): string {
  const pattern = includeY ? /[aeiouy]/gi : /[aeiou]/gi;
  return text.replace(pattern, '');
}
removeVowels('Rhythm', true); // "Rhthm"  (if `y` is treated as a vowel)
