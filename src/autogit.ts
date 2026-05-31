function countWordSplit(text: string, word: string, ignoreCase = false): number {
  // Normalize to a single delimiter so we don’t double‑count
  const delim = ignoreCase ? text.toLowerCase() : text;
  const target = ignoreCase ? word.toLowerCase() : word;

  // Split on a regex that matches the word exactly
  const parts = delim.split(new RegExp(`\\b${target}\\b`, 'g'));
  // If the word never appears, parts.length will be 1
  return parts.length - 1;
}
function countWordMatch(text: string, word: string, ignoreCase = false): number {
  const flags = ignoreCase ? 'gi' : 'g';
  const matches = text.match(new RegExp(`\\b${word}\\b`, flags));
  return matches ? matches.length : 0;
}
function countWordManual(text: string, word: string, ignoreCase = false): number {
  const t = ignoreCase ? text.toLowerCase() : text;
  const w = ignoreCase ? word.toLowerCase() : word;
  const wLen = w.length;

  let count = 0;
  for (let i = 0; i <= t.length - wLen; i++) {
    // Word boundary logic: check chars before/after
    const before = i === 0 || !/\w/.test(t[i - 1]);
    const after  = i + wLen === t.length || !/\w/.test(t[i + wLen]);

    if (before && after && t.substr(i, wLen) === w) {
      count++;
      i += wLen - 1; // skip past this occurrence
    }
  }
  return count;
}
function countOverlapping(text: string, word: string, ignoreCase = false): number {
  const flags = ignoreCase ? 'gi' : 'g';
  const regex = new RegExp(`(?=${word})`, flags);
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}
const str = "The cat sat on the cat's mat. Cat bites tar.";
const word = "cat";

console.log(countWordSplit(str, word, true));   // 3
console.log(countWordMatch(str, word, true));   // 3
console.log(countWordManual(str, word, true));  // 3
