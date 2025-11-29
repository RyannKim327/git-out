/**
 * A prime number used as the base for polynomial hashing.
 * Choosing a good prime base helps distribute hashes evenly and reduces collisions.
 */
const PRIME_BASE = 31; // A common choice for lowercase English alphabet, or 53 for broader ASCII.

/**
 * A large prime number used as the modulo for hashing.
 * This prevents hash values from becoming too large and causing integer overflow,
 * while still keeping the number of collisions low.
 */
const MODULO = 1_000_000_007; // A large prime, often 10^9 + 7 or 10^9 + 9.

/**
 * Converts a character to a numerical value for hashing.
 * We simply use charCodeAt(0) which gives the Unicode value.
 * For a-z specific scenarios, you might use `char.charCodeAt(0) - 'a'.charCodeAt(0) + 1`.
 * The key is consistency for all characters.
 */
function getCharValue(char: string): number {
    return char.charCodeAt(0);
}

/**
 * Implements the Rabin-Karp algorithm for string searching.
 * Finds all occurrences of a pattern within a text.
 *
 * @param text The text string to search within.
 * @param pattern The pattern string to search for.
 * @returns An array of starting indices where the pattern is found in the text.
 */
export function rabinKarpSearch(text: string, pattern: string): number[] {
    const n = text.length;
    const m = pattern.length;
    const resultIndices: number[] = [];

    // Handle edge cases
    if (m === 0) {
        // An empty pattern is considered to match at every position,
        // including after the last character.
        return Array.from({ length: n + 1 }, (_, i) => i);
    }
    if (n === 0 || m > n) {
        // No text to search, or pattern is longer than the text.
        return [];
    }

    // --- Precompute (PRIME_BASE ^ (m-1)) % MODULO ---
    // This value is used to quickly "remove" the contribution of the
    // leading character when the window slides.
    // Example: For hash(abc) = a*p^2 + b*p^1 + c*p^0, to get hash(bcd),
    // we need to remove a*p^2. So we need p^(m-1) to multiply with 'a'.
    let powerMMinus1 = 1;
    for (let i = 0; i < m - 1; i++) {
        powerMMinus1 = (powerMMinus1 * PRIME_BASE) % MODULO;
    }

    // --- Calculate hash for the pattern ---
    let patternHash = 0;
    for (let i = 0; i < m; i++) {
        patternHash = (patternHash * PRIME_BASE + getCharValue(pattern[i])) % MODULO;
    }

    // --- Calculate hash for the first window of the text ---
    let textWindowHash = 0;
    for (let i = 0; i < m; i++) {
        textWindowHash = (textWindowHash * PRIME_BASE + getCharValue(text[i])) % MODULO;
    }

    // --- Iterate through the text, sliding the window ---
    for (let i = 0; i <= n - m; i++) {
        // 1. Check for hash match
        if (patternHash === textWindowHash) {
            // Hashes match, but it could be a collision.
            // Perform a character-by-character check (full check) to confirm.
            let match = true;
            for (let j = 0; j < m; j++) {
                if (text[i + j] !== pattern[j]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                resultIndices.push(i);
            }
        }

        // 2. Calculate rolling hash for the next window
        // This step is only needed if there's a next window to consider.
        if (i < n - m) {
            // Remove the contribution of the leading character (text[i])
            // Example: hash(abc) = a*p^2 + b*p^1 + c*p^0
            // To remove 'a', we subtract (a * p^(m-1))
            textWindowHash = (textWindowHash - getCharValue(text[i]) * powerMMinus1) % MODULO;

            // Ensure the hash doesn't become negative due to the modulo operator
            // in JavaScript, which can return negative results for negative inputs.
            textWindowHash = (textWindowHash + MODULO) % MODULO;

            // Shift the remaining hash by multiplying with PRIME_BASE
            // Example: (b*p^1 + c*p^0) * p = b*p^2 + c*p^1
            textWindowHash = (textWindowHash * PRIME_BASE) % MODULO;

            // Add the contribution of the new trailing character (text[i+m])
            // Example: (b*p^2 + c*p^1) + d*p^0 = hash(bcd)
            textWindowHash = (textWindowHash + getCharValue(text[i + m])) % MODULO;
        }
    }

    return resultIndices;
}
// Assuming the `rabinKarpSearch` function is in a file like `rabinKarp.ts`
// import { rabinKarpSearch } from './rabinKarp'; // If in a module

const text1 = "ABABDABACDABABCABAB";
const pattern1 = "ABABCABAB";
console.log(`Searching for "${pattern1}" in "${text1}"`);
console.log(`Found at indices: ${rabinKarpSearch(text1, pattern1)}`); // Expected: [10]

const text2 = "hello world, hello typescript";
const pattern2 = "hello";
console.log(`\nSearching for "${pattern2}" in "${text2}"`);
console.log(`Found at indices: ${rabinKarpSearch(text2, pattern2)}`); // Expected: [0, 13]

const text3 = "aaaaa";
const pattern3 = "aa";
console.log(`\nSearching for "${pattern3}" in "${text3}"`);
console.log(`Found at indices: ${rabinKarpSearch(text3, pattern3)}`); // Expected: [0, 1, 2, 3]

const text4 = "abcdefg";
const pattern4 = "xyz";
console.log(`\nSearching for "${pattern4}" in "${text4}"`);
console.log(`Found at indices: ${rabinKarpSearch(text4, pattern4)}`); // Expected: []

const text5 = "test";
const pattern5 = ""; // Empty pattern
console.log(`\nSearching for an empty pattern in "${text5}"`);
console.log(`Found at indices: ${rabinKarpSearch(text5, pattern5)}`); // Expected: [0, 1, 2, 3, 4] (matches at every position including after the last char)

const text6 = "short";
const pattern6 = "verylongpattern";
console.log(`\nSearching for "${pattern6}" in "${text6}"`);
console.log(`Found at indices: ${rabinKarpSearch(text6, pattern6)}`); // Expected: []
