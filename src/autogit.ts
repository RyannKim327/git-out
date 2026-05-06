/**
 * Return the longest common prefix of an array of strings.
 *
 * @param strs - The strings to investigate.
 * @returns The common prefix (empty string if there is none, or if the array is empty).
 */
export function longestCommonPrefix(strs: string[]): string {
  if (strs.length === 0) return "";

  // Start with the first string as the provisional prefix
  let prefix = strs[0];

  // Stop as soon as prefix becomes empty – nothing more to find
  for (let i = 1; i < strs.length && prefix.length; i++) {
    const current = strs[i];
    let j = 0;

    // Compare char‑by‑char until a mismatch is detected
    while (j < prefix.length && j < current.length && prefix[j] === current[j]) {
      j++;
    }

    // Update prefix to the matched portion
    prefix = prefix.substring(0, j);
  }

  return prefix;
}
const words = ["flower","flow","flight"];
console.log(longestCommonPrefix(words)); // → "fl"

const mixed = ["dog","racecar","car"];
console.log(longestCommonPrefix(mixed)); // → ""

const emptyCases: string[] = [];
console.log(longestCommonPrefix(emptyCases)); // → ""
export function lcpVertical(strs: string[]): string {
  if (!strs.length) return "";
  for (let i = 0; i < strs[0].length; i++) {
    const char = strs[0][i];
    for (let j = 1; j < strs.length; j++) {
      if (i >= strs[j].length || strs[j][i] !== char) {
        return strs[0].substring(0, i);
      }
    }
  }
  return strs[0];
}
