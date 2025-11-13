hash(S) = (S[0]*base^(m-1) + S[1]*base^(m-2) + ... + S[m-1]*base^0) mod prime
function rabinKarp(text: string, pattern: string): number[] {
    const result: number[] = [];
    const n = text.length;
    const m = pattern.length;
    if (m > n) return result;

    const base = 256; // number of possible chars
    const prime = 101; // a prime modulus for hashing

    let patternHash = 0;
    let textHash = 0;
    let h = 1;

    // h = base^(m-1) % prime
    for (let i = 0; i < m - 1; i++) {
        h = (h * base) % prime;
    }

    // Calculate initial hashes
    for (let i = 0; i < m; i++) {
        patternHash = (base * patternHash + pattern.charCodeAt(i)) % prime;
        textHash = (base * textHash + text.charCodeAt(i)) % prime;
    }

    // Slide through the text
    for (let i = 0; i <= n - m; i++) {
        // If hashes match, check actual substring
        if (patternHash === textHash) {
            if (text.substr(i, m) === pattern) {
                result.push(i);
            }
        }

        // Roll the hash forward
        if (i < n - m) {
            textHash = (base * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % prime;
            // handle negative hash
            if (textHash < 0) {
                textHash += prime;
            }
        }
    }
    return result;
}

// Example usage:
console.log(rabinKarp("abracadabra", "abra")); // Output: [0, 7]
