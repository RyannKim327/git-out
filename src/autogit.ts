/**
 * Implements the Rabin-Karp algorithm for string searching.
 *
 * @param text The text to search within.
 * @param pattern The pattern to search for.
 * @returns An array of starting indices where the pattern is found in the text.
 */
function rabinKarp(text: string, pattern: string): number[] {
    const n = text.length;
    const m = pattern.length;
    const results: number[] = [];

    // Edge cases:
    if (m === 0) {
        // An empty pattern matches everywhere, before each character and at the end.
        return Array.from({ length: n + 1 }, (_, i) => i);
    }
    if (n < m) {
        // Pattern is longer than text, no match possible.
        return [];
    }

    // --- Hashing Constants ---
    // A prime number, typically larger than the alphabet size.
    // Using 31 for lowercase English alphabet, but charCodeAt can go up to 65535,
    // so 257 (a prime larger than 256 for common ASCII) or even 53 is often used.
    const PRIME = 31;
    // A large prime modulus to prevent integer overflow and reduce collisions.
    const MOD = 1_000_000_007; // 10^9 + 7

    // --- Precompute h_power (PRIME^(m-1) % MOD) ---
    // This value is used to remove the contribution of the leading character when rolling the hash.
    let h_power = 1;
    for (let i = 0; i < m - 1; i++) {
        h_power = (h_power * PRIME) % MOD;
    }

    // --- Calculate initial hashes for pattern and first text window ---
    let patternHash = 0;
    let textHash = 0;
    for (let i = 0; i < m; i++) {
        // Calculate pattern hash: (P[0]*p^(m-1) + P[1]*p^(m-2) + ... + P[m-1]*p^0) % MOD
        patternHash = (patternHash * PRIME + pattern.charCodeAt(i)) % MOD;
        // Calculate text window hash: (T[0]*p^(m-1) + T[1]*p^(m-2) + ... + T[m-1]*p^0) % MOD
        textHash = (textHash * PRIME + text.charCodeAt(i)) % MOD;
    }

    // --- Slide the window over the text ---
    for (let i = 0; i <= n - m; i++) {
        // Step 1: Check for hash match
        if (patternHash === textHash) {
            // Step 2: If hashes match, perform a full character-by-character comparison
            // This is crucial to handle hash collisions (false positives).
            let match = true;
            for (let j = 0; j < m; j++) {
                if (text[i + j] !== pattern[j]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                results.push(i);
            }
        }

        // Step 3: Calculate hash for the next window
        // Only do this if there's a next window to consider.
        if (i < n - m) {
            // Remove the leading character's contribution:
            // current_hash - T[i]*p^(m-1)
            textHash = (textHash - (text.charCodeAt(i) * h_power) % MOD + MOD) % MOD; // Add MOD to ensure positive result before final modulo

            // Shift the hash by multiplying by PRIME:
            // (current_hash - T[i]*p^(m-1)) * p
            textHash = (textHash * PRIME) % MOD;

            // Add the new trailing character's contribution:
            // (current_hash - T[i]*p^(m-1)) * p + T[i+m]
            textHash = (textHash + text.charCodeAt(i + m)) % MOD;
        }
    }

    return results;
}

// --- Example Usage ---

console.log("Example 1:", rabinKarp("ABABDABACDABABCABAB", "ABABCABAB")); // Expected: [10]
console.log("Example 2:", rabinKarp("AAAAA", "AAA"));                  // Expected: [0, 1, 2]
console.log("Example 3:", rabinKarp("test", "test"));                  // Expected: [0]
console.log("Example 4:", rabinKarp("apple", "banana"));               // Expected: []
console.log("Example 5:", rabinKarp("ababa", "aba"));                  // Expected: [0, 2]
console.log("Example 6:", rabinKarp("long string with multiple matches", "match")); // Expected: [20]
console.log("Example 7:", rabinKarp("aaaaa", "a"));                    // Expected: [0, 1, 2, 3, 4]
console.log("Example 8:", rabinKarp("TypeScript", "type"));             // Expected: [-1] (oops, pattern not found) -> [4]
console.log("Example 9:", rabinKarp("TypeScript", "Type"));             // Expected: [0]
console.log("Example 10:", rabinKarp("abc", ""));                       // Expected: [0, 1, 2, 3] (empty string matches everywhere)
console.log("Example 11:", rabinKarp("abacaba", "aba"));              // Expected: [0, 4]
