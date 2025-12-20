/**
 * Returns the longest common prefix of the given strings.
 * If the array is empty, returns an empty string.
 *
 * @param strs - array of strings to examine
 * @returns the longest common prefix
 */
export function longestCommonPrefix(strs: string[]): string {
  if (strs.length === 0) return "";

  // 1️⃣ Find the shortest string – it bounds the maximum possible prefix length.
  let shortest = strs[0];
  for (const s of strs) {
    if (s.length < shortest.length) shortest = s;
  }

  // 2️⃣ Scan character by character.
  for (let i = 0; i < shortest.length; i++) {
    const ch = shortest[i];
    // Compare this character with the same position in every other string.
    for (const s of strs) {
      if (s[i] !== ch) {
        // Mismatch → prefix ends right before this index.
        return shortest.slice(0, i);
      }
    }
  }

  // If we never broke out, the whole shortest string is the prefix.
  return shortest;
}
export function longestCommonPrefixVertical(strs: string[]): string {
  if (!strs.length) return "";
  for (let i = 0; ; i++) {
    const char = strs[0][i];
    if (char === undefined) return strs[0].slice(0, i); // reached end of first string
    for (let j = 1; j < strs.length; j++) {
      if (strs[j][i] !== char) return strs[0].slice(0, i);
    }
  }
}
export function longestCommonPrefixDivideAndConquer(strs: string[]): string {
  if (!strs.length) return "";

  const lcp = (left: number, right: number): string => {
    if (left === right) return strs[left];
    const mid = Math.floor((left + right) / 2);
    const leftPrefix = lcp(left, mid);
    const rightPrefix = lcp(mid + 1, right);
    return commonPrefix(leftPrefix, rightPrefix);
  };

  const commonPrefix = (a: string, b: string): string => {
    const minLen = Math.min(a.length, b.length);
    let i = 0;
    while (i < minLen && a[i] === b[i]) i++;
    return a.slice(0, i);
  };

  return lcp(0, strs.length - 1);
}
export function longestCommonPrefixReduce(strs: string[]): string {
  if (!strs.length) return "";
  return strs.reduce((prefix, cur) => {
    let i = 0;
    while (i < prefix.length && i < cur.length && prefix[i] === cur[i]) i++;
    return prefix.slice(0, i);
  });
}
// test.ts
import { longestCommonPrefix } from "./lcp";

const cases: { input: string[]; expected: string }[] = [
  { input: ["flower", "flow", "flight"], expected: "fl" },
  { input: ["dog", "racecar", "car"], expected: "" },
  { input: ["interspecies", "interstellar", "interstate"], expected: "inters" },
  { input: ["throne", "throne"], expected: "throne" },
  { input: [], expected: "" },
  { input: ["single"], expected: "single" },
];

for (const { input, expected } of cases) {
  const result = longestCommonPrefix(input);
  console.assert(
    result === expected,
    `FAIL: input=${JSON.stringify(input)} → ${result} (expected ${expected})`
  );
}
console.log("All tests passed!");
ts-node test.ts   # or compile with tsc and node
// longestCommonPrefix.ts
export function longestCommonPrefix(strs: string[]): string {
  if (strs.length === 0) return "";

  // Find the shortest string – it limits the maximum possible prefix length.
  let shortest = strs[0];
  for (const s of strs) {
    if (s.length < shortest.length) shortest = s;
  }

  // Scan each character of the shortest string.
  for (let i = 0; i < shortest.length; i++) {
    const ch = shortest[i];
    for (const s of strs) {
      if (s[i] !== ch) {
        return shortest.slice(0, i);
      }
    }
  }

  // No mismatches → the whole shortest string is the common prefix.
  return shortest;
}

/* -------------------------------------------------
   Example usage (uncomment to run):
--------------------------------------------------- */
// const words = ["flower", "flow", "flight"];
// console.log(longestCommonPrefix(words)); // → "fl"
