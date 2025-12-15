function countOverlapping(text: string, word: string): number {
  if (word.length === 0) return 0;          // avoid infinite loop
  let count = 0;
  let pos = 0;
  while (true) {
    pos = text.indexOf(word, pos);
    if (pos === -1) break;
    count++;
    pos++;                                  // move only one char forward
  }
  return count;
}

console.log(countOverlapping("aaaa", "aa")); // 3
function countWholeWords(text: string, word: string): number {
  // Escape regex-special characters in the word
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

console.log(countWholeWords('One fish, two fish, red fish, blue fish', 'fish')); // 4
