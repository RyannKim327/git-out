/**
 * Implements the Rabin-Karp string searching algorithm.
 *
 * @param text The string to search within.
 * @param pattern The pattern string to search for.
 * @param base An optional prime number used as the base for the hash function.
 *             Defaults to 256 (suitable for extended ASCII).
 * @param modulus An optional large prime number used as the modulus for the hash function.
 *                Defaults to 10^9 + 7 to prevent hash values from becoming too large and reduce collisions.
 * @returns An array of indices where the pattern is found in the text.
 */
function rabinKarp(
  text: string,
  pattern: string,
  base: number = 256, // A prime base for character set (e.g., ASCII extended)
  modulus: number = 10 ** 9 + 7 // A large prime modulus
): number[] {
  const n = text.length;
  const m = pattern.length;

  const results: number[] = [];

  // Edge cases
  if (m === 0) {
    // An empty pattern matches before every character and at the end.
    return Array.from({ length: n + 1 }, (_, i) => i);
  }
  if (n < m) {
    return []; // Pattern is longer than the text, no match possible.
  }

  // Precompute h_power = base^(m-1) % modulus
  // This value is used to remove the leading character's contribution
  // when sliding the hash window.
  let h_power = 1;
  for (let i = 0; i < m - 1; i++) {
    h_power = (h_power * base) % modulus;
  }

  // Calculate initial hashes for the pattern and the first window of the text
  let patternHash = 0;
  let textHash = 0;
  for (let i = 0; i < m; i++) {
    // charCodeAt(i) gets the Unicode value of the character at index i.
    // For simplicity, we assume character codes are positive.
    patternHash = (patternHash * base + pattern.charCodeAt(i)) % modulus;
    textHash = (textHash * base + text.charCodeAt(i)) % modulus;
  }

  // Slide the window across the text
  for (let i = 0; i <= n - m; i++) {
    // If the hashes match, perform a character-by-character comparison
    // to confirm a true match and handle potential hash collisions (spurious hits).
    if (patternHash === textHash) {
      let match = true;
      for (let j = 0; j < m; j++) {
        if (text.charCodeAt(i + j) !== pattern.charCodeAt(j)) {
          match = false;
          break; // Mismatch found, not a true match.
        }
      }
      if (match) {
        results.push(i); // Pattern found at index i
      }
    }

    // Compute hash for the next window
    // Only update the hash if there's a next window to consider
    if (i < n - m) {
      // Remove the leading character's contribution from the current window's hash
      // (text.charCodeAt(i) * h_power) % modulus gives the value of the leading character
      // adjusted to its position in the hash polynomial.
      // We add `modulus` before the final `% modulus` to ensure the result
      // of subtraction is always positive.
      textHash = (textHash - (text.charCodeAt(i) * h_power) % modulus + modulus) % modulus;

      // Multiply the hash by `base` to shift all existing characters to the left (higher power)
      textHash = (textHash * base) % modulus;

      // Add the new trailing character's contribution
      textHash = (textHash + text.charCodeAt(i + m)) % modulus;
    }
  }

  return results;
}

// --- Examples ---

console.log("Example 1: Basic match");
console.log(rabinKarp("ABABDABACDABABCABAB", "ABABCABAB")); // Expected: [10]

console.log("\nExample 2: Multiple matches");
console.log(rabinKarp("GEEKSFORGEEKS", "GEEK")); // Expected: [0, 9]

console.log("\nExample 3: No match");
console.log(rabinKarp("HELLO WORLD", "XYZ")); // Expected: []

console.log("\nExample 4: Pattern longer than text");
console.log(rabinKarp("SHORT", "LONGER_PATTERN")); // Expected: []

console.log("\nExample 5: Empty pattern");
console.log(rabinKarp("ANYTEXT", "")); // Expected: [0, 1, 2, 3, 4, 5, 6, 7]

console.log("\nExample 6: Pattern at start");
console.log(rabinKarp("banana", "ban")); // Expected: [0]

console.log("\nExample 7: Pattern at end");
console.log(rabinKarp("banana", "ana")); // Expected: [1, 3]

console.log("\nExample 8: Single character pattern");
console.log(rabinKarp("aaaaa", "a")); // Expected: [0, 1, 2, 3, 4]

console.log("\nExample 9: Text with special characters");
console.log(rabinKarp("Hello, world! 🌍", "world")); // Expected: [7]

console.log("\nExample 10: Unicode characters (using default base=256, which might not be optimal for all Unicode)");
console.log(rabinKarp("नमस्ते दुनिया", "दुनिया")); // Expected: [8] (Note: charCodeAt handles individual UTF-16 code units. For full Unicode code points, a different approach for `base` might be needed or combined with surrogate pair handling, but `charCodeAt` often suffices for common characters.)

