/**
 * Returns the longest common prefix among all given strings.
 * If the array is empty it returns an empty string.
 */
function longestCommonPrefix(words: string[]): string {
  if (!words.length) return '';

  // The first string will act as a reference; we hammer it down
  // as far as we need to.
  let prefix = words[0];

  // Compare the current prefix to every other word.
  for (const w of words.slice(1)) {
    // Keep truncating the prefix until it matches the start of w.
    while (!w.startsWith(prefix)) {
      prefix = prefix.slice(0, -1); // strip last char
      if (!prefix) return ''; // nothing common any more
    }
  }

  return prefix;
}
console.log(longestCommonPrefix(['flower', 'flow', 'flight'])); // "fl"
console.log(longestCommonPrefix(['dog', 'racecar', 'car']));    // ""
function lcpSort(words: string[]): string {
  if (!words.length) return '';

  const sorted = [...words].sort();
  const a = sorted[0];
  const b = sorted[sorted.length - 1];
  let i = 0;

  while (i < a.length && a[i] === b[i]) i++;

  return a.slice(0, i);
}
