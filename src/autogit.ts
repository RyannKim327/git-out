/**
 * Reverse the order of words in a string.
 *
 * Words are anything separated by whitespace (space, tab, etc.).
 * Leading/trailing whitespace is trimmed for a clean result, but
 * consecutive internal spaces are collapsed to a single space – you can keep
 * them if you prefer by tweaking the regex.
 *
 * @param s  The input string.
 * @returns   The string with the words reversed.
 */
function reverseWords(s: string): string {
  // 1. Trim surrounding whitespace, then split on any sequence of whitespace.
  const words = s.trim().split(/\s+/);

  // 2. Reverse the array in place.
  words.reverse();

  // 3. Join back with a single space (change if you need a different separator).
  return words.join(' ');
}

// Demo
const original = "  the quick brown   fox jumps over the lazy dog  ";
const reversed = reverseWords(original);

console.log("Original:", original);
console.log("Reversed:", reversed);
// Output: "dog lazy the over jumps fox brown quick the"
const words = s.split(/\s+/);
