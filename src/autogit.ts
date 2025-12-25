/**
 * Returns the longest common prefix of the given strings.
 * If the array is empty, returns an empty string.
 *
 * @param strings - An array of strings (may contain empty strings)
 * @returns The longest common prefix shared by all strings
 */
export function longestCommonPrefix(strings: string[]): string {
  // Edge cases ---------------------------------------------------------------
  if (!strings.length) return "";
  if (strings.length === 1) return strings[0];

  // Use the first string as the initial candidate prefix
  let prefix = strings[0];

  // Iterate over the remaining strings ---------------------------------------
  for (let i = 1; i < strings.length; i++) {
    const current = strings[i];

    // While `prefix` is NOT a prefix of `current`, shrink it
    while (!current.startsWith(prefix)) {
      // Remove the last character from the candidate
      prefix = prefix.slice(0, -1);

      // If we have trimmed everything, there is no common prefix
      if (prefix === "") return "";
    }
  }

  return prefix;
}
// ---------------------------------------------------------------
// Example usage (you can paste this into a .ts file and run with ts-node)
import { longestCommonPrefix } from "./lcp"; // adjust path if needed

const testCases: { input: string[]; expected: string }[] = [
  { input: ["flower", "flow", "flight"], expected: "fl" },
  { input: ["dog", "racecar", "car"], expected: "" },
  { input: ["interspecies", "interstellar", "interstate"], expected: "inters" },
  { input: ["throne", "throne"], expected: "throne" },
  { input: ["", "empty", "nothing"], expected: "" },
  { input: [], expected: "" },
  { input: ["single"], expected: "single" },
];

for (const { input, expected } of testCases) {
  const result = longestCommonPrefix(input);
  console.log(
    `Input: ${JSON.stringify(input)}\n` +
    `→ LCP: "${result}" (expected "${expected}") ` +
    `${result === expected ? "✅" : "❌"}\n`
  );
}
Input: ["flower","flow","flight"]
→ LCP: "fl" (expected "fl") ✅

Input: ["dog","racecar","car"]
→ LCP: "" (expected "") ✅

...
export const lcp = (a: string[]) =>
  a.reduce((p, s) => {
    while (!s.startsWith(p)) p = p.slice(0, -1);
    return p;
  }, a[0] ?? "");
