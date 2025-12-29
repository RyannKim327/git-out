/**
 * Returns the number of times `char` occurs in `source`.
 *
 * @param source The string to search.
 * @param char   The single character to count.
 * @returns      The occurrence count (≥ 0).
 */
function countChar(source: string, char: string): number {
    if (char.length !== 1) {
        throw new Error('`char` must be a single character');
    }

    let count = 0;
    for (const c of source) {
        if (c === char) count++;
    }
    return count;
}

// Usage
const text = "abracadabra";
console.log(countChar(text, "a")); // 5
function countCharSplit(source: string, char: string): number {
    if (char.length !== 1) {
        throw new Error('`char` must be a single character');
    }
    // Split on the character; the resulting array length is count+1
    return source.split(char).length - 1;
}

// Example
console.log(countCharSplit("mississippi", "s")); // 4
function countCharReduce(source: string, char: string): number {
    if (char.length !== 1) {
        throw new Error('`char` must be a single character');
    }
    return [...source].reduce((acc, cur) => (cur === char ? acc + 1 : acc), 0);
}

// Example
console.log(countCharReduce("hello world", "l")); // 3
function countWithRegex(source: string, pattern: string, flags = "g"): number {
    // Escape special regex characters if you only want a literal match
    const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, flags);
    const matches = source.match(regex);
    return matches ? matches.length : 0;
}

// Literal character, case‑insensitive
console.log(countWithRegex("Banana", "a", "gi")); // 3

// Substring example
console.log(countWithRegex("ababab", "ab")); // 3
import GraphemeSplitter from "grapheme-splitter";

function countGraphemes(source: string, target: string): number {
    const splitter = new GraphemeSplitter();
    const graphemes = splitter.splitGraphemes(source);
    return graphemes.filter(g => g === target).length;
}

// Example
const complex = "👩‍❤️‍💋‍👨👩‍❤️‍💋‍👨";
console.log(countGraphemes(complex, "👩‍❤️‍💋‍👨")); // 2
/**
 * Counts occurrences of `needle` inside `haystack`.
 *
 * - If `needle` is a single character, a fast loop is used.
 * - Otherwise, `split` is used (still O(n) but simpler).
 *
 * @param haystack The string to search.
 * @param needle   The character or substring to count.
 * @param caseSensitive Optional flag (default true).
 * @returns Number of non‑overlapping occurrences.
 */
function countOccurrences(
    haystack: string,
    needle: string,
    caseSensitive = true
): number {
    if (needle === "") {
        throw new Error("`needle` must not be empty");
    }

    // Normalise case if needed
    if (!caseSensitive) {
        haystack = haystack.toLowerCase();
        needle = needle.toLowerCase();
    }

    // Fast path for a single character
    if (needle.length === 1) {
        let cnt = 0;
        for (const ch of haystack) {
            if (ch === needle) cnt++;
        }
        return cnt;
    }

    // General case – split on the needle
    return haystack.split(needle).length - 1;
}

// Usage
console.log(countOccurrences("Hello hello HELLO", "hello", false)); // 3
console.log(countOccurrences("abababa", "aba")); // 2 (non‑overlapping)
function countOverlapping(source: string, needle: string): number {
    if (needle === "") return 0;
    const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(?=${escaped})`, "g");
    return (source.match(regex) ?? []).length;
}

// Example
console.log(countOverlapping("aaa", "aa")); // 2
const big = "a".repeat(10_000_000) + "b";

console.time("loop");
countChar(big, "a");
console.timeEnd("loop");   // ~30‑40 ms

console.time("split");
countCharSplit(big, "a");
console.timeEnd("split");  // ~70‑90 ms (allocates an array)

console.time("regex");
countWithRegex(big, "a");
console.timeEnd("regex");  // ~45‑55 ms
