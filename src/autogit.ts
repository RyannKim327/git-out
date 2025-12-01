/**
 * Implements the Rabin-Karp algorithm for string searching.
 * Finds all occurrences of a pattern string within a text string.
 *
 * @param text The larger string to search within.
 * @param pattern The smaller string to search for.
 * @returns An array of starting indices where the pattern is found in the text.
 */
function rabinKarp(text: string, pattern: string): number[] {
    const n = text.length;
    const m = pattern.length;
    const results: number[] = [];

    // Edge cases
    if (m === 0) {
        // An empty pattern is technically found at any position,
        // but for practical string search, we usually return no matches.
        // Or, it could be argued to return [0, 1, ..., n] if it matches everywhere.
        // For simplicity, we return no matches here.
        return results;
    }
    if (m > n) {
        return results;
    }

    // Rabin-Karp parameters
    const d = 256; // Radix (size of the alphabet, e.g., ASCII)
    const q = 10**9 + 7; // A large prime number for modulo operation (to reduce collisions)

    let pHash = 0; // Hash value for the pattern
    let tHash = 0; // Hash value for the current window of text
    let h = 1;     // d^(m-1) % q (highest power of d, used for removing leading character's contribution)

    // Precompute h = d^(m-1) % q
    for (let i = 0; i < m - 1; i++) {
        h = (h * d) % q;
    }

    // Calculate the initial hash values for pattern and the first window of text
    for (let i = 0; i < m; i++) {
        pHash = (pHash * d + pattern.charCodeAt(i)) % q;
        tHash = (tHash * d + text.charCodeAt(i)) % q;
    }

    // Slide the window over the text
    for (let i = 0; i <= n - m; i++) {
        // If hashes match, then check characters one by one to avoid spurious hits (hash collisions)
        if (pHash === tHash) {
            let match = true;
            for (let j = 0; j < m; j++) {
                if (text.charCodeAt(i + j) !== pattern.charCodeAt(j)) {
                    match = false;
                    break;
                }
            }
            if (match) {
                results.push(i);
            }
        }

        // Calculate hash for the next window
        if (i < n - m) {
            // Remove the leading character's contribution from the hash
            // (tHash - char_at_i * h)
            // Add `q` before taking modulo to ensure the result is non-negative
            tHash = (tHash - (text.charCodeAt(i) * h) % q + q) % q;

            // Shift the remaining hash by one position (multiply by d)
            tHash = (tHash * d) % q;

            // Add the new trailing character's contribution
            // (tHash + char_at_i_plus_m)
            tHash = (tHash + text.charCodeAt(i + m)) % q;
        }
    }

    return results;
}

// --- Example Usage ---

console.log("--- Test Case 1: Basic Match ---");
const text1 = "ABABDABACDABABCABAB";
const pattern1 = "ABABCABAB";
const matches1 = rabinKarp(text1, pattern1);
console.log(`Text: "${text1}"`);
console.log(`Pattern: "${pattern1}"`);
console.log(`Matches at indices: ${matches1}`); // Expected: [10]

console.log("\n--- Test Case 2: Multiple Matches ---");
const text2 = "AAAAAA";
const pattern2 = "AA";
const matches2 = rabinKarp(text2, pattern2);
console.log(`Text: "${text2}"`);
console.log(`Pattern: "${pattern2}"`);
console.log(`Matches at indices: ${matches2}`); // Expected: [0, 1, 2, 3, 4]

console.log("\n--- Test Case 3: No Match ---");
const text3 = "HELLO WORLD";
const pattern3 = "GOODBYE";
const matches3 = rabinKarp(text3, pattern3);
console.log(`Text: "${text3}"`);
console.log(`Pattern: "${pattern3}"`);
console.log(`Matches at indices: ${matches3}`); // Expected: []

console.log("\n--- Test Case 4: Pattern at start ---");
const text4 = "apple banana";
const pattern4 = "apple";
const matches4 = rabinKarp(text4, pattern4);
console.log(`Text: "${text4}"`);
console.log(`Pattern: "${pattern4}"`);
console.log(`Matches at indices: ${matches4}`); // Expected: [0]

console.log("\n--- Test Case 5: Pattern at end ---");
const text5 = "apple banana";
const pattern5 = "banana";
const matches5 = rabinKarp(text5, pattern5);
console.log(`Text: "${text5}"`);
console.log(`Pattern: "${pattern5}"`);
console.log(`Matches at indices: ${matches5}`); // Expected: [6]

console.log("\n--- Test Case 6: Longer pattern than text ---");
const text6 = "short";
const pattern6 = "verylongpattern";
const matches6 = rabinKarp(text6, pattern6);
console.log(`Text: "${text6}"`);
console.log(`Pattern: "${pattern6}"`);
console.log(`Matches at indices: ${matches6}`); // Expected: []

console.log("\n--- Test Case 7: Empty pattern ---");
const text7 = "abc";
const pattern7 = "";
const matches7 = rabinKarp(text7, pattern7);
console.log(`Text: "${text7}"`);
console.log(`Pattern: "${pattern7}"`);
console.log(`Matches at indices: ${matches7}`); // Expected: []

console.log("\n--- Test Case 8: Single character pattern ---");
const text8 = "banana";
const pattern8 = "a";
const matches8 = rabinKarp(text8, pattern8);
console.log(`Text: "${text8}"`);
console.log(`Pattern: "${pattern8}"`);
console.log(`Matches at indices: ${matches8}`); // Expected: [1, 3, 5]
