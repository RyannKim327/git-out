function countWordOccurrences(text: string, word: string): number {
  // Escape any regex meta‑characters in the search word
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // \b = word boundary, i = ignore case, g = global (find all)
  const regex = new RegExp(`\\b${escaped}\\b`, 'gi');

  // .match() returns an array of all matches, null if none
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

// Usage
const msg = "The quick brown fox jumps over the lazy fox. Foxes are clever.";
console.log(countWordOccurrences(msg, "fox")); // → 2 (fox, fox)
const regex = new RegExp(escaped, 'gi');
function countSplit(text: string, word: string): number {
  // Empty string returns 0
  if (!text) return 0;
  return text.split(word).length - 1;
}
function countWithMatchAll(text: string, word: string): number {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
  const allMatches = text.matchAll(regex); // Iterable<{ index: … }>

  let count = 0;
  for (const _ of allMatches) count++;
  return count;
}
export function countOccurrences(
  text: string,
  word: string,
  options?: { caseSensitive?: boolean; wholeWord?: boolean }
): number {
  const { caseSensitive = false, wholeWord = true } = options ?? {};

  // Escape regex meta‑chars
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  let pattern = wholeWord ? `\\b${escaped}\\b` : escaped;
  let flags = 'g' + (caseSensitive ? '' : 'i');

  const regex = new RegExp(pattern, flags);
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}
