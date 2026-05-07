/**
 * Count how many times a whole word appears in a text.
 *
 * @param text   The text to search in.
 * @param word   The word you’re looking for.
 * @param caseSensitive Set to `true` if you want case‑sensitive matches.
 * @returns The number of non‑overlapping occurrences.
 */
export function countWordOccurrences(
  text: string,
  word: string,
  caseSensitive: boolean = false
): number {
  // Escape any regex metacharacters that could be in the word.
  const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Build a regex that matches the word with word‑boundaries.
  // \b ensures we don’t count “the” inside “there”.
  const flags = caseSensitive ? 'g' : 'gi';
  const regex = new RegExp(`\\b${escapedWord}\\b`, flags);

  const matches = text.match(regex);
  return matches?.length ?? 0;
}
console.log(countWordOccurrences('Hello world, hello again.', 'hello')); // 2
console.log(countWordOccurrences('Batman & batman! Batman?', 'batman')); // 1 (case‑sensitive)
console.log(countWordOccurrences('The cat in the cathedral.', 'cat')); // 2
function countBySplit(text: string, word: string, caseSensitive = false) {
  const flags = caseSensitive ? '' : 'i';
  const regex = new RegExp(`\\b${escapeRegExp(word)}\\b`, flags);
  return text.split(regex).length - 1;
}
