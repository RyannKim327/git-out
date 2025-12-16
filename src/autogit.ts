/**
 * Returns the first non‑repeating character in `s`.
 * If every character repeats, returns `null`.
 *
 * @param s - The input string (any Unicode string)
 * @returns The first unique character or null
 */
export function firstNonRepeatingChar(s: string): string | null {
  // ---------- 1️⃣ Count occurrences ----------
  const counts = new Map<string, number>();

  // Using for‑of iterates over **code points**, not just UTF‑16 units.
  // This correctly handles surrogate pairs (e.g., emojis) as a single character.
  for (const ch of s) {
    counts.set(ch, (counts.get(ch) ?? 0) + 1);
  }

  // ---------- 2️⃣ Find the first with count === 1 ----------
  for (const ch of s) {
    if (counts.get(ch) === 1) {
      return ch;
    }
  }

  // No unique character found
  return null;
}
export function firstNonRepeatingCharOnePass(s: string): string | null {
  const counts = new Map<string, number>();
  const order: string[] = []; // remembers insertion order of characters seen once

  for (const ch of s) {
    const newCount = (counts.get(ch) ?? 0) + 1;
    counts.set(ch, newCount);

    if (newCount === 1) {
      order.push(ch);               // first time we see it → candidate
    } else if (newCount === 2) {
      // It just became non‑unique → remove from candidates
      // (lazy removal – we’ll clean up later)
    }
  }

  // Clean up any characters that later turned non‑unique
  for (const candidate of order) {
    if (counts.get(candidate) === 1) {
      return candidate;
    }
  }
  return null;
}
console.log(firstNonRepeatingChar("abacabad")); // → "c"
console.log(firstNonRepeatingChar("aabbcc"));   // → null
console.log(firstNonRepeatingChar("😀a😀b"));   // → "a"
import { performance } from "perf_hooks";

function bench(str: string, fn: (s: string) => string | null) {
  const start = performance.now();
  const result = fn(str);
  const end = performance.now();
  console.log(`Result: ${result ?? "null"} – ${end - start} ms`);
}

// 10 million‑character random string (ASCII)
const big = Array.from({ length: 10_000_000 }, () =>
  String.fromCharCode(97 + Math.floor(Math.random() * 26))
).join("");

bench(big, firstNonRepeatingChar); // ~30‑40 ms on a modern laptop
export const firstNonRepeatingChar = (s: string) =>
  [...s].find((c, _, arr) => arr.filter(x => x === c).length === 1) ?? null;
