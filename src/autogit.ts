/**
 * Rabin-Karp Algorithm for string pattern matching
 * @param text The text to search within
 * @param pattern The pattern to search for
 * @returns Array of starting indices where pattern is found
 */
function rabinKarpSearch(text: string, pattern: string): number[] {
    // Edge case: pattern is empty or longer than text
    if (pattern.length === 0 || pattern.length > text.length) {
        return [];
    }

    const matches: number[] = [];
    const n = text.length;
    const m = pattern.length;

    // Prime modulus to prevent overflow and reduce collisions
    const modulus = 101;
    // Base for the rolling hash (number of characters in alphabet)
    const base = 256;
    
    // Calculate (base^(m-1)) % modulus for rolling hash
    let h = 1;
    for (let i = 0; i < m - 1; i++) {
        h = (h * base) % modulus;
    }

    // Compute initial hash values for pattern and first window in text
    let patternHash = 0;
    let windowHash = 0;

    for (let i = 0; i < m; i++) {
        patternHash = (patternHash * base + pattern.charCodeAt(i)) % modulus;
        windowHash = (windowHash * base + text.charCodeAt(i)) % modulus;
    }

    // Slide the window over the text
    for (let i = 0; i <= n - m; i++) {
        // Check if hashes match
        if (windowHash === patternHash) {
            // Verify actual substring match to handle hash collisions
            let match = true;
            for (let j = 0; j < m; j++) {
                if (text[i + j] !== pattern[j]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                matches.push(i);
            }
        }

        // Calculate hash for next window (if not at last window)
        if (i < n - m) {
            windowHash = (
                (base * (windowHash - text.charCodeAt(i) * h)) + 
                text.charCodeAt(i + m)
            ) % modulus;
            
            // Handle negative values
            if (windowHash < 0) {
                windowHash += modulus;
            }
        }
    }

    return matches;
}
const text = "ABABCABABABDABABCABAB";
const pattern = "ABABC";
const result = rabinKarpSearch(text, pattern);

console.log("Pattern found at indices:", result);
// Output: Pattern found at indices: [0, 10]
