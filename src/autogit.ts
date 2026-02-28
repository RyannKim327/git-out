function countWordOccurrences(str: string, word: string): number {
  // Escape any regex‑special characters in the word
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escaped, 'g');

  const matches = str.match(regex);
  return matches ? matches.length : 0;
}

/* Example */
const txt = "Lorem ipsum dolor sit amet. Lorem ipsum!";
console.log(countWordOccurrences(txt, "Lorem")); // 2
function countWordOccurrencesInsensitive(str: string, word: string): number {
  const lowered = str.toLowerCase();
  const target = word.toLowerCase();

  // Split on the target word – keep empty pieces that might appear
  // at the boundaries or due to overlapping patterns
  return lowered.split(target).length - 1;
}

/* Example */
console.log(countWordOccurrencesInsensitive(txt, "lorem")); // 2
