/**
 * Removes every vowel (a, e, i, o, u) from the given string.
 *
 * @param input - The original string.
 * @returns The string without vowels.
 */
function removeVowels(input: string): string {
  // The regex /[aeiou]/gi means:
  //   - [aeiou]  → any of the characters a, e, i, o, u
  //   - i        → case‑insensitive (so it also matches A, E, …)
  //   - g        → global (replace *all* matches, not just the first)
  return input.replace(/[aeiou]/gi, '');
}

// Example usage:
const original = "Hello, TypeScript World!";
const noVowels = removeVowels(original);
console.log(noVowels); // "Hll, TpScrpt Wrld!"
function removeVowelsFilter(input: string): string {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
  return input
    .split('')               // → string[]
    .filter(ch => !vowels.has(ch))
    .join('');               // → string
}

// Example:
console.log(removeVowelsFilter("TypeScript is fun!")); // "TpScrpt s fn!"
function removeVowelsLoop(input: string): string {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
  let result = '';

  for (const ch of input) {
    if (!vowels.has(ch)) {
      result += ch; // Append only non‑vowel characters
    }
  }

  return result;
}

// Example:
console.log(removeVowelsLoop("Remove Vowels!")); // "Rmv Vwls!"
/**
 * Removes every character that appears in `charsToRemove` from `input`.
 *
 * @param input - The original string.
 * @param charsToRemove - A string containing all characters to strip.
 * @returns The cleaned string.
 */
function stripCharacters(input: string, charsToRemove: string): string {
  // Build a character class like [aeiou] dynamically and escape any regex meta‑characters.
  const escaped = charsToRemove.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`[${escaped}]`, 'gi');
  return input.replace(regex, '');
}

// Vowel‑specific shortcut:
const removeVowelsGeneric = (s: string) => stripCharacters(s, 'aeiou');

console.log(removeVowelsGeneric('Generic helper works!')); // "Gnrc hlpr wrks!"
function removeVowels(input: string): string {
  return input.replace(/[aeiou]/gi, '');
}
