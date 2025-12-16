function escapeRegExp(s: string): string {
  // Escape characters that have special meaning in RegExp
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function countWordOccurrences(text: string, word: string, caseSensitive = false): number {
  if (!word) return 0;
  const escaped = escapeRegExp(word);
  const flags = 'g' + (caseSensitive ? '' : 'i');
  const regex = new RegExp(`\\b${escaped}\\b`, flags);
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}
const str = "The cat sat on the catapult, but not the cat in category.";
console.log(countWordOccurrences(str, "cat")); // 2 (whole word "cat" only)
console.log(countWordOccurrences(str, "Cat", false)); // 2 (case-insensitive)
console.log(countWordOccurrences(str, "cat", true)); // 1 (case-sensitive)
