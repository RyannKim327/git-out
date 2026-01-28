/**
 * Return the longest common prefix of an array of strings.
 *
 * @param arr – list of strings to compare
 * @returns the longest common prefix, or an empty string if none exists
 */
function longestCommonPrefix(arr: string[]): string {
  if (!arr.length) return "";

  // The classic “compare the first and last after sorting” trick.
  // It guarantees we only have to check the two outermost strings,
  // because any common prefix must be common to all.
  const sorted = [...arr].sort();                  // sort lexicographically
  const first = sorted[0];
  const last  = sorted[sorted.length - 1];

  let i = 0;
  const minLen = Math.min(first.length, last.length);

  while (i < minLen && first.charAt(i) === last.charAt(i)) {
    i++;
  }

  return first.substring(0, i);
}
function lcpScan(arr: string[]): string {
  if (!arr.length) return "";

  let prefix = arr[0];

  for (const s of arr.slice(1)) {
    // shrink prefix until it’s a prefix of s
    while (!s.startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return "";
    }
  }
  return prefix;
}
const words = ["flower", "flow", "flight"];
console.log(longestCommonPrefix(words)); // → "fl"

const zoo = ["dog", "racecar", "car"];
console.log(longestCommonPrefix(zoo));   // → ""
