function countWord(text: string, word: string): number {
  // Escape word so special regex symbols don’t bite us
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // \b = word boundary, i = ignore case, g = global (all matches)
  const re = new RegExp(`\\b${escaped}\\b`, 'gi');
  const matches = text.match(re);
  return matches ? matches.length : 0;
}
const txt = "Boo, boo! Boo-boo? Booing… boo.";
console.log(countWord(txt, 'boo')); // 3
function countWordSplit(text: string, word: string) {
  const words = text.trim().split(/\s+/);
  const target = word.toLowerCase();
  return words.filter(w => w.toLowerCase() === target).length;
}
function countWordLoop(text: string, word: string) {
  const target = word.toLowerCase();
  let count = 0;
  const regex = /\b\w+\b/g;               // grab words
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match[0].toLowerCase() === target) count++;
  }
  return count;
}
const count = countWord("Hello because we say hello", "hello"); // 2
