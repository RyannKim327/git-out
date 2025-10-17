function rabinKarp(text: string, pattern: string): number[] {
    const n = text.length;
    const m = pattern.length;
    const result: number[] = [];

    // Edge cases
    if (m === 0) {
        // If pattern is empty, it "matches" at every position.
        // Depending on requirements, could return [0, 1, ..., n] or []
        // For simplicity, we'll treat it as no match, or an invalid pattern.
        return [];
    }
    if (n === 0 || m > n) {
        return [];
    }

    // --- Hash Parameters ---
    // A prime number for modulo operation. Larger prime reduces collisions.
    const Q = 10**9 + 7; 
    // Base for hashing (number of characters in alphabet, e.g., ASCII has 256).
    const D = 256; 

    // Precompute D^(m-1) % Q. This is used to remove the leftmost digit's value.
    let h = 1;
    for (let i = 0; i < m - 1; i++) {
        h = (h * D) % Q;
    }

    // --- Calculate initial hashes ---
    let patternHash = 0;
    let textWindowHash = 0;
    for (let i = 0; i < m; i++) {
        patternHash = (patternHash * D + pattern.charCodeAt(i)) % Q;
        textWindowHash = (textWindowHash * D + text.charCodeAt(i)) % Q;
    }

    // --- Slide the window ---
    for (let i = 0; i <= n - m; i++) {
        // Step 1: Check for hash match
        if (patternHash === textWindowHash) {
            // If hashes match, perform a character-by-character check
            // to handle spurious matches (hash collisions).
            let match = true;
            for (let j = 0; j < m; j++) {
                if (text.charCodeAt(i + j) !== pattern.charCodeAt(j)) {
                    match = false;
                    break;
                }
            }
            if (match) {
                result.push(i); // Found an occurrence
            }
        }

        // Step 2: Calculate hash for the next window
        // Only update hash if there's a next window to slide to
        if (i < n - m) {
            // Remove the leftmost character's contribution
            // (text.charCodeAt(i) * h) is the value of the character at D^(m-1)
            textWindowHash = (textWindowHash - (text.charCodeAt(i) * h) % Q + Q) % Q; 
            // The `+ Q` ensures the result is positive before the final modulo.

            // Multiply by D to shift remaining characters left
            textWindowHash = (textWindowHash * D) % Q;

            // Add the new rightmost character's contribution
            textWindowHash = (textWindowHash + text.charCodeAt(i + m)) % Q;
        }
    }

    return result;
}

// --- Example Usage ---
const text1 = "ABABDABACDABABCABAB";
const pattern1 = "ABABCABAB";
const matches1 = rabinKarp(text1, pattern1);
console.log(`Text: "${text1}"`);
console.log(`Pattern: "${pattern1}"`);
console.log("Matches at indices:", matches1); // Expected: [10]

const text2 = "AAAAAA";
const pattern2 = "AA";
const matches2 = rabinKarp(text2, pattern2);
console.log(`\nText: "${text2}"`);
console.log(`Pattern: "${pattern2}"`);
console.log("Matches at indices:", matches2); // Expected: [0, 1, 2, 3, 4]

const text3 = "HELLO WORLD";
const pattern3 = "WORLD";
const matches3 = rabinKarp(text3, pattern3);
console.log(`\nText: "${text3}"`);
console.log(`Pattern: "${pattern3}"`);
console.log("Matches at indices:", matches3); // Expected: [6]

const text4 = "TESTING RABIN KARP";
const pattern4 = "XYZ";
const matches4 = rabinKarp(text4, pattern4);
console.log(`\nText: "${text4}"`);
console.log(`Pattern: "${pattern4}"`);
console.log("Matches at indices:", matches4); // Expected: []

const text5 = "BANANA";
const pattern5 = "ANA";
const matches5 = rabinKarp(text5, pattern5);
console.log(`\nText: "${text5}"`);
console.log(`Pattern: "${pattern5}"`);
console.log("Matches at indices:", matches5); // Expected: [1, 3]

const text6 = "A";
const pattern6 = "A";
const matches6 = rabinKarp(text6, pattern6);
console.log(`\nText: "${text6}"`);
console.log(`Pattern: "${pattern6}"`);
console.log("Matches at indices:", matches6); // Expected: [0]

const text7 = "ABC";
const pattern7 = "ABCD";
const matches7 = rabinKarp(text7, pattern7);
console.log(`\nText: "${text7}"`);
console.log(`Pattern: "${pattern7}"`);
console.log("Matches at indices:", matches7); // Expected: [] (pattern longer than text)
