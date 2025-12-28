/**
 * Returns the first repeated character in `s`.
 * If there is no repeated character, returns `null`.
 *
 * @param s - The input string (any Unicode characters are fine)
 * @returns The first character that occurs more than once, or null
 */
function firstRepeatedChar(s: string): string | null {
    // A Set gives O(1) lookup for “have we seen this already?”
    const seen = new Set<string>();

    // Iterate over the string **in order** – the first duplicate we meet is the answer.
    for (const ch of s) {
        if (seen.has(ch)) {
            // We have already seen this character → it is the first repeat.
            return ch;
        }
        seen.add(ch);
    }

    // No character repeated
    return null;
}

/* ------------------- Example usage ------------------- */
const examples = [
    "abca",          // → 'a'
    "hello world",  // → 'l' (the first 'l' repeats)
    "abcdef",        // → null (no repeats)
    "😀🐶😀",        // → '😀' (works with Unicode emojis)
];

for (const str of examples) {
    console.log(`"${str}" →`, firstRepeatedChar(str));
}
function firstRepeatedCharWithCounts(s: string): string | null {
    const counts = new Map<string, number>();
    for (const ch of s) {
        const c = (counts.get(ch) ?? 0) + 1;
        if (c === 2) return ch;   // first time we reach count 2 → first repeat
        counts.set(ch, c);
    }
    return null;
}
