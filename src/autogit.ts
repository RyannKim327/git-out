/**
 * Returns the first repeated character in `s`.
 * If there is no repetition, the function returns `null`.
 *
 * @param s - The input string (can contain any Unicode characters)
 * @returns The first character that occurs more than once, or null.
 */
export function firstRepeatedChar(s: string): string | null {
    // A Set gives O(1) lookup for “have we seen this character already?”
    const seen = new Set<string>();

    // `for...of` iterates over Unicode code points, not just UTF‑16 units.
    // This means characters like emojis (👩‍💻) are handled correctly.
    for (const ch of s) {
        if (seen.has(ch)) {
            // As soon as we encounter a character that is already in the set,
            // we have found the *first* repeated character.
            return ch;
        }
        seen.add(ch);
    }

    // No character repeated.
    return null;
}
import { firstRepeatedChar } from "./firstRepeatedChar";

console.log(firstRepeatedChar("abca"));          // → "a"
console.log(firstRepeatedChar("hello world"));  // → "l"
console.log(firstRepeatedChar("abcdef"));       // → null
console.log(firstRepeatedChar("😀😃😀"));        // → "😀"
console.log(firstRepeatedChar("aA"));           // → null (case‑sensitive)
function firstRepeatedChar(s: string): string | null {
    const seen = new Set<string>();
    for (const ch of s) {
        if (seen.has(ch)) return ch;
        seen.add(ch);
    }
    return null;
}

// Demo
const tests = [
    "abca",
    "hello world",
    "abcdef",
    "😀😃😀",
    "aA",
    "Mississippi",
];

for (const t of tests) {
    console.log(`"${t}" → ${firstRepeatedChar(t) ?? "no repeat"}`);
}
"abca" → a
"hello world" → l
"abcdef" → no repeat
"😀😃😀" → 😀
"aA" → no repeat
"Mississippi" → s
