function countWord(haystack: string, needle: string): number {
  if (!needle) return 0;                     // empty word → 0
  const esc = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escape regex meta-chars
  const regex = new RegExp(`\\b${esc}\\b`, 'gi');
  const matches = haystack.match(regex);
  return matches ? matches.length : 0;
}

// ---- usage ----
const text = 'One fish, two Fish, three FISH, four fish.';
console.log(countWord(text, 'fish')); // → 4
