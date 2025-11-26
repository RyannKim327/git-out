function countWord(text: string, word: string): number {
  // Escape regex-special characters in the word
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

// --- usage ---
const str = 'One fish, two fish, red fish, blue fish.';
console.log(countWord(str, 'fish')); // 4
console.log(countWord(str, 'Fish')); // 4 (case-insensitive)
console.log(countWord(str, 'sh'));   // 0 (not a whole word)
function countSubstring(text: string, sub: string): number {
  if (sub === '') return 0;
  let count = 0, pos = 0;
  while ((pos = text.indexOf(sub, pos)) !== -1) {
    ++count;
    pos += sub.length;
  }
  return count;
}
const occurrences = str.split(/\bword\b/).length - 1;
