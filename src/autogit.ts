/**
 * Return the longest common prefix of an array of strings.
 * If the array is empty the result is the empty string.
 *
 * @param strs Array of strings
 * @returns The longest common prefix
 */
export function longestCommonPrefix(strs: string[]): string {
  if (strs.length === 0) return "";

  // Start with the entire first string as a tentative prefix.
  let prefix = strs[0];

  // Iterate over the rest of the strings.
  for (let i = 1; i < strs.length; i++) {
    const s = strs[i];

    // Shrink the prefix until it matches the current string
    // (or becomes empty).
    while (!s.startsWith(prefix)) {
      // Drop the last character
      prefix = prefix.slice(0, -1);
      if (!prefix) return ""; // No common prefix
    }
  }

  return prefix;
}
console.log(longestCommonPrefix(["flower","flow","flight"])); // "fl"
console.log(longestCommonPrefix(["dog","racecar","car"]));    // ""
console.log(longestCommonPrefix([]));                         // ""
console.log(longestCommonPrefix(["interspecies", "interstellar", "interstate"])); // "inters"
export function lcpBySorting(strs: string[]): string {
  if (strs.length === 0) return "";

  const sorted = [...strs].sort(); // Lexicographical order
  const first = sorted[0];
  const last  = sorted[sorted.length - 1];
  const minLen = Math.min(first.length, last.length);

  let i = 0;
  while (i < minLen && first[i] === last[i]) i++;

  return first.slice(0, i);
}
