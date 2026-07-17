/**
 * Returns the longest common prefix of the supplied strings.
 * If the array is empty, or if no common prefix exists, an empty string is returned.
 */
export function longestCommonPrefix(arr: readonly string[]): string {
  if (arr.length === 0) return '';

  // We’ll be comparing the first element with every other one.
  // Once a mismatch is found we stop expanding the prefix.
  let prefix = arr[0];

  for (let i = 1; i < arr.length; ++i) {
    // Shorten the prefix until it matches the start of arr[i]
    while (arr[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, -1);
      if (prefix === '') return '';
    }
  }

  return prefix;
}
const words = ['flower', 'flow', 'flight'];
console.log(longestCommonPrefix(words)); // prints "fl"

const mix = ['dog', 'racecar', 'car'];
console.log(longestCommonPrefix(mix));   // prints ""
export const longestCommonPrefix = (arr: readonly string[]) => arr.reduce(
  (prev, curr) => {
    let i = 0;
    while (i < prev.length && i < curr.length && prev[i] === curr[i]) {
      i++;
    }
    return prev.slice(0, i);
  },
  arr[0] ?? ''
);
