/**
 * Return the longest common prefix among the strings.
 *
 * @param words - Array of strings (non‑empty works great, but you can pass an empty array and get `""` back)
 * @returns the longest common prefix, or an empty string if there isn’t one
 */
export function longestCommonPrefix(words: string[]): string {
  if (!words.length) return '';

  // Work with a copy to avoid mutating the caller’s array
  const sorted = [...words].sort();

  // The prefix can’t be longer than the shortest word, so we cap it early.
  const [shortest] = sorted.reduce((prev, curr) => (curr.length < prev[0].length ? [curr, ...prev] : prev), [''] as [string, ...string[]]);

  // Compare characters of the first and last words
  let prefix = '';
  for (let i = 0; i < shortest.length; i++) {
    const char = sorted[0][i];
    if (sorted[0][i] !== sorted[sorted.length - 1][i]) break;
    prefix += char;
  }

  return prefix;
}
console.log(longestCommonPrefix(['flower', 'flow', 'flight'])); // "fl"
console.log(longestCommonPrefix(['dog', 'racecar', 'car']));   // ""
console.log(longestCommonPrefix(['interspecies', 'interstellar', 'interstate'])); // "inters"
console.log(longestCommonPrefix([])); // ""
export function lcpLinear(words: string[]): string {
  if (!words.length) return '';
  let prefix = words[0];
  for (let i = 1; i < words.length; i++) {
    while (!words[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return '';
    }
  }
  return prefix;
}
