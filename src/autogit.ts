/**
 * Count occurrences of a word in a string.
 *
 * @param text   The text to search through.
 * @param word   The word to count (exact case‑sensitive match).
 * @param flags  Optional RegExp flags (default is “g” for global).
 * @returns The number of matches found.
 */
export function countWordOccurrences(
  text: string,
  word: string,
  flags: string = "g"
): number {
  // Escape regex metacharacters in the word so it’s treated literally
  const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`\\b${escapedWord}\\b`, flags);
  const matches = text.match(regex);
  return matches?.length ?? 0;
}
let sentence = "The quick brown fox jumps over the lazy dog. The fox was quick.";

console.log(countWordOccurrences(sentence, "fox"));          // 2
console.log(countWordOccurrences(sentence, "quick"));       // 2
console.log(countWordOccurrences(sentence, "quick", "gi")); // 2 (case‑insensitive)
