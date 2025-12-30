/**
 * Returns the longest common prefix among all strings in the array.
 * If the array is empty, returns "".
 */
function longestCommonPrefix(strs: string[]): string {
  if (!strs.length) return '';

  // Start by assuming the whole first string is the prefix
  let prefix = strs[0];

  // Trim the prefix until every string starts with it
  for (let i = 1; i < strs.length; i++) {
    while (!strs[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);        // drop last char
      if (prefix === '') return '';       // early exit
    }
  }
  return prefix;
}

/* ---------- usage ---------- */
console.log(longestCommonPrefix(['flower', 'flow', 'flight'])); // "fl"
console.log(longCommonPrefix([]));                             // ""
