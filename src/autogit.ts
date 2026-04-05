function countOccurrences(str: string, word: string): number {
  // \b = word boundary; 'gi' = case‑insensitive, global
  const regex = new RegExp(`\\b${word}\\b`, 'gi');
  return str.split(regex).length - 1;
}
function countOccurrences2(str: string, word: string): number {
  const regex = new RegExp(`\\b${word}\\b`, 'gi');
  const matches = str.match(regex);
  return matches ? matches.length : 0;
}
function countOccurrences3(str: string, word: string): number {
  let count = 0;
  let pos = 0;

  while ((pos = str.toLowerCase().indexOf(word.toLowerCase(), pos)) !== -1) {
    // Ensure whole‑word match using boundaries (optional)
    const before = pos === 0 || /\W/.test(str[pos - 1]);
    const after  = pos + word.length === str.length
                 || /\W/.test(str[pos + word.length]);

    if (before && after) {
      count++;
    }
    pos += word.length;
  }

  return count;
}
const paragraph = `
  TypeScript is great. TypeScript's type system helps catch bugs early.
  A developer who uses typescript should ideally care about types.
`;

console.log(countOccurrences(paragraph, 'typescript'));   // → 4
console.log(countOccurrences2(paragraph, 'typescript')); // → 4
console.log(countOccurrences3(paragraph, 'typescript')); // → 4
