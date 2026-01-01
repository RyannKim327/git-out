/**
 * Returns the first non‑repeating character in `input`.
 *
 * @param input - The string to search.
 * @returns The first character that occurs exactly once,
 *          or `null` if every character repeats.
 */
export function firstNonRepeatingChar(input: string): string | null {
  // Edge case: empty string
  if (!input) return null;

  // 1️⃣ Count occurrences
  const counts = new Map<string, number>();
  for (const ch of input) {
    // Using Map lets us handle any Unicode code point (including surrogate pairs)
    counts.set(ch, (counts.get(ch) ?? 0) + 1);
  }

  // 2️⃣ Find the first character with a count of 1
  for (const ch of input) {
    if (counts.get(ch) === 1) {
      return ch;
    }
  }

  // No non‑repeating character found
  return null;
}
import { firstNonRepeatingChar } from "./firstNonRepeatingChar";

console.log(firstNonRepeatingChar("abacabad")); // → "c"
console.log(firstNonRepeatingChar("aabbcc"));   // → null
console.log(firstNonRepeatingChar(""));         // → null
console.log(firstNonRepeatingChar("😀a😀b"));   // → "a"
// firstNonRepeatingChar.test.ts
import { firstNonRepeatingChar } from "./firstNonRepeatingChar";

describe("firstNonRepeatingChar", () => {
  test("basic cases", () => {
    expect(firstNonRepeatingChar("abacabad")).toBe("c");
    expect(firstNonRepeatingChar("aabbcc")).toBeNull();
    expect(firstNonRepeatingChar("")).toBeNull();
  });

  test("unicode characters", () => {
    expect(firstNonRepeatingChar("😀a😀b")).toBe("a");
    expect(firstNonRepeatingChar("🧡🧡💙💚💙")).toBe("💚");
  });

  test("case‑insensitive variant", () => {
    const fn = (s: string) => firstNonRepeatingChar(s.toLowerCase());
    expect(fn("AaBbC")).toBe("c");
  });
});
export const firstNonRepeatingChar = (s: string): string | null =>
  [...s].find(c => s.split(c).length - 1 === 1) ?? null;
