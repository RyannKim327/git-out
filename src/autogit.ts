function rabinKarpSearch(text: string, pattern: string): number[] {
    const results: number[] = [];
    const n = text.length;
    const m = pattern.length;
    
    // Edge case: pattern is longer than text
    if (m > n || m === 0) {
        return results;
    }

    // Constants (use large primes)
    const base = 256;        // Number of characters in the alphabet (ASCII)
    const modulus = 101;     // Prime modulus to prevent overflow and collisions
    
    // Precompute (base^(m-1)) % modulus
    let highestPower = 1;
    for (let i = 0; i < m - 1; i++) {
        highestPower = (highestPower * base) % modulus;
    }

    // Calculate initial hash values for 
    // the pattern and first text window
    let patternHash = 0;
    let textHash = 0;
    
    for (let i = 0; i < m; i++) {
        patternHash = (base * patternHash + pattern.charCodeAt(i)) % modulus;
        textHash = (base * textHash + text.charCodeAt(i)) % modulus;
    }

    // Slide the pattern over the text
    for (let i = 0; i <= n - m; i++) {
        // Check hash collision
        if (textHash === patternHash) {
            // Verify actual characters to prevent false positives
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

        // Compute next window hash if not the last window
        if (i < n - m) {
            textHash = (base * (textHash - text.charCodeAt(i) * highestPower)
                        + text.charCodeAt(i + m)) % modulus;
            
            // Ensure hash is positive
            if (textHash < 0) {
                textHash += modulus;
            }
        }
    }

    return results;
}

// Example usage:
console.log(rabinKarpSearch("abracadabra", "abra")); // Output: [0, 7]
console.log(rabinKarpSearch("aaaaa", "aa"));        // Output: [0, 1, 2, 3]
console.log(rabinKarpSearch("mississippi", "issip")); // Output: [4]
