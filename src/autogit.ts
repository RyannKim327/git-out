/**
 * Count how many times a whole word appears in a string.
 *
 * @param haystack  The text to search.
 * @param needle    The word you’re looking for.
 * @param caseSensitive  If false, treat both inputs as lower‑case.
 * @returns Number of matches.
 */
function countWord(
  haystack: string,
  needle: string,
  caseSensitive = false
): number {
  if (!needle) return 0;

  const flags = caseSensitive ? 'g' : 'gi';
  // \b ensures we only match whole words
  const re = new RegExp(`\\b${escapeRegExp(needle)}\\b`, flags);
  const matches = haystack.match(re);
  return matches ? matches.length : 0;
}

/** Helper to escape regex meta‑characters in the needle. */
function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
const text = 'The quick brown fox jumps over the lazy dog. The fox was quick.';

console.log(countWord(text, 'quick'));   // 2
console.log(countWord(text, 'the'));     // 2 (case‑insensitive)
console.log(countWord(text, 'the', true)); // 1 (case‑sensitive)
function countWordUsingSplit(
  text: string,
  word: string,
  caseSensitive = false
): number {
  if (!word) return 0;

  const base = caseSensitive ? text : text.toLowerCase();
  const target = caseSensitive ? word : word.toLowerCase();

  // Split on whitespace and punctuation
  const tokens = base.split(/\W+/).filter(Boolean);
  return tokens.filter(t => t === target).length;
}
const re = new RegExp(escapeRegExp(substring), 'g'); // add gi for case‑insensitive
const count = (text.match(re) || []).length;
