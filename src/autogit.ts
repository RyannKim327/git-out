/**
 * Returns the longest common prefix of the supplied strings.
 * @param strs Array of strings.  An empty array yields an empty string.
 */
export function longestCommonPrefix(strs: string[]): string {
  if (strs.length === 0) return '';

  // The prefix can never be longer than the shortest string
  let prefix = strs[0];

  for (let i = 1; i < strs.length; i++) {
    // Trim the prefix until it matches the start of strs[i]
    while (!strs[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (prefix === '') return '';          // No common prefix
    }
  }

  return prefix;
}
function longestCommonPrefixSorted(strs: string[]): string {
  if (!strs.length) return '';
  // Sorting guarantees that the first and last strings differ the most
  const sorted = [...strs].sort();
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  let i = 0;
  while (i < first.length && i < last.length && first[i] === last[i]) i++;
  return first.slice(0, i);
}
console.log(longestCommonPrefix(['flower', 'flow', 'flight'])); // → 'fl'
console.log(longestCommonPrefix(['dog', 'racecar', 'car']));   // → ''
