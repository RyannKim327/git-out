/**
 * Returns the longest common prefix of all strings in `arr`.
 *
 * @param arr – an array of strings (can be empty)
 * @returns the prefix that every string shares, or an empty string
 */
function longestCommonPrefix(arr: string[]): string {
  if (!arr.length) return "";

  // Pin the “shortest”‑length string as a stopping rule.
  // No prefix can be longer than this string.
  const minLen = Math.min(...arr.map(s => s.length));

  for (let i = 0; i < minLen; i++) {
    const char = arr[0][i]; // candidate character
    // stop as soon as any string mismatches
    for (let j = 1; j < arr.length; j++) {
      if (arr[j][i] !== char) {
        return arr[0].substring(0, i);
      }
    }
  }

  // All `minLen` characters matched
  return arr[0].substring(0, minLen);
}
const words = ["flower", "flow", "flight"];
console.log(longestCommonPrefix(words)); // logs "fl"
function longestCommonPrefixSort(arr: string[]): string {
  if (!arr.length) return "";

  const sorted = [...arr].sort();          // O(n log n)
  const first = sorted[0];
  const last  = sorted[sorted.length - 1];

  let i = 0;
  while (i < first.length && i < last.length && first[i] === last[i]) {
    i++;
  }

  return first.substring(0, i);
}
function lcpDivideAndConquer(arr: string[], l = 0, r = arr.length - 1): string {
  if (l > r) return "";
  if (l === r) return arr[l];

  const mid = Math.floor((l + r) / 2);
  const leftPref  = lcpDivideAndConquer(arr, l, mid);
  const rightPref = lcpDivideAndConquer(arr, mid + 1, r);

  // intersect two prefixes
  let i = 0;
  while (i < leftPref.length && i < rightPref.length && leftPref[i] === rightPref[i]) {
    i++;
  }
  return leftPref.substring(0, i);
}

// convenience wrapper
function longestCommonPrefixD&C(arr: string[]): string {
  return lcpDivideAndConquer(arr);
}
const cases: [string[], string][] = [
  [["", "", ""]]          , [""],
  [["dog"], ["dog"]]      , ["dog"],
  [["abc","ab"],
   ["ab"]]                , ["ab"],
  [["abc","abcd","abce"], ["abc"]],
  [["agri", "adopt", "alien"], ["a"]],
  [["b", "a"], [""]], 
];

cases.forEach(([arr, expected], i) => {
  const result = longestCommonPrefix(arr);
  console.log(i, result === expected[0] ? "✅" : `❌ got "${result}"`);
});
