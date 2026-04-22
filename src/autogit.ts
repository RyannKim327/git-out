/**
 * How many times does `word` appear in `text`?
 *
 * @param text   The string to search.
 * @param word   The exact word you’re looking for (case‑insensitive).
 * @returns      Number of matches.
 */
export function countWord(text: string, word: string): number {
  if (!word) return 0;                      // avoid /()/ which matches every position

  const re = new RegExp(`\\b${escapeRegExp(word)}\\b`, 'gi');
  const matches = text.match(re);
  return matches ? matches.length : 0;
}

/** Escape characters that have special meaning in a regex. */
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
const note = "The quick brown fox jumps over the lazy dog. The fox is quick.";
console.log(countWord(note, "the"));   // 3 (The, the, The)
console.log(countWord(note, "fox"));   // 2
function countWordSimple(text: string, word: string): number {
  const lw = word.toLowerCase();
  return text
    .split(/\s+/)
    .filter(tok => tok.toLowerCase() === lw).length;
}
