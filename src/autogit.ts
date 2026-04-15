/**
 * Removes all vowels (a, e, i, o, u) from the given string.
 *
 * @param str - The input string to process.
 * @returns A new string with all vowels removed.
 */
export function removeVowels(str: string): string {
  // The regex matches any of a, e, i, o, u in either case.
  return str.replace(/[aeiouAEIOU]/g, '');
}
console.log(removeVowels("Hello, World!"));       // "Hll, Wrld!"
console.log(removeVowels("TypeScript is awesome")); // "TypScrpt s wsm"
return str.replace(/[aeiouyAEIOUY]/g, '');
export function removeVowelsManual(str: string): string {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
  let result = '';
  for (const ch of str) {
    if (!vowels.has(ch)) result += ch;
  }
  return result;
}
