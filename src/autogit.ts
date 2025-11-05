/**
 * Returns the longest common prefix among an array of strings.
 * If the array is empty, returns the empty string.
 */
function longestCommonPrefix(strs: string[]): string {
  if (!strs.length) return '';

  // Start by assuming the whole first string is the prefix
  let prefix = strs[0];

  // Trim the prefix until every string starts with it
  for (let i = 1; i < strs.length; i++) {
    while (!strs[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (prefix === '') return ''; // Early exit
    }
  }
  return prefix;
}

/* ---------- Usage ---------- */
console.log(longestCommonPrefix(['flower', 'flow', 'flight'])); // "fl"
console.log(longestCommonPrefix(['dog', 'racecar', 'car']));     // ""
console.log(longestCommonPrefix([]));                           // ""
