/**
 * Counts how many code units a string contains.
 * @param s The string to measure.
 * @returns The length as a number.
 */
function getStringLength(s: string): number {
  let count = 0;

  // Keep stepping forward until we encounter an undefined slot.
  while (s[count] !== undefined) {
    count++;
  }

  return count;
}
function getStringLengthUsingForOf(s: string): number {
  let count = 0;
  for (const _ of s) {
    count++;        // `_` is just a throwaway variable
  }
  return count;    // this is the number of Unicode code points we iterated over
}
function getStringLengthRecursive(s: string, idx = 0): number {
  return s[idx] === undefined
    ? idx
    : getStringLengthRecursive(s, idx + 1);
}
const demo = "Hello, 👋🌍";

console.log(getStringLength(demo));                    // 13 (code units)
console.log(getStringLengthUsingForOf(demo));          // 10 (code points)
