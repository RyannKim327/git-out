/**
 * Returns the longest common prefix of an array of strings.
 * If the array is empty, returns an empty string.
 *
 * @param words - array of strings
 * @returns longest common prefix
 */
function longestCommonPrefix(words: string[]): string {
  if (words.length === 0) return '';

  // 1. Find the min and max strings (lexicographically)
  let min = words[0];
  let max = words[0];
  for (let i = 1; i < words.length; i++) {
    const w = words[i];
    if (w < min) min = w;
    if (w > max) max = w;
  }

  // 2. Find first mismatch between min and max
  let j = 0;
  while (j < min.length && j < max.length && min[j] === max[j]) {
    j++;
  }

  // 3. Slice the common part
  return min.slice(0, j);
}
const arr = ['flower', 'flow', 'flight'];
console.log(longestCommonPrefix(arr)); // → "fl"

console.log(longestCommonPrefix(['dog', 'racecar', 'car'])); // → ""
console.log(longestCommonPrefix(['inter', 'internet', 'intermediate'])); // → "inter"
console.log(longestCommonPrefix(['single'])); // → "single"
console.log(longestCommonPrefix([])); // → ""
