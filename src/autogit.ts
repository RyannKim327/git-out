/**
 * Rabin‑Karp string search
 *
 * Parameters:
 *  pattern – the string we’re looking for
 *  text    – the string to search inside
 *
 * Returns:
 *  array of starting indices where pattern occurs (empty if no match)
 */
export function rabinKarp(pattern: string, text: string): number[] {
    // Edge cases
    if (pattern.length === 0) return [];
    if (pattern.length > text.length) return [];

    const base = 256;               // number of possible characters (ASCII)
    const mod = 101;                // a prime mod to keep numbers small

    const m = pattern.length;
    const n = text.length;

    // Pre‑compute base^(m‑1) % mod  (the “high” power)
    let basePower = 1;
    for (let i = 0; i < m - 1; i++) {
        basePower = (basePower * base) % mod;
    }

    // Compute hash for pattern and first window of text
    let patHash = 0;
    let txtHash = 0;
    for (let i = 0; i < m; i++) {
        patHash = (patHash * base + pattern.charCodeAt(i)) % mod;
        txtHash = (txtHash * base + text.charCodeAt(i)) % mod;
    }

    const result: number[] = [];

    // Slide the window over the text
    for (let s = 0; s <= n - m; s++) {
        // If the hash values match, verify the substring to confirm
        if (patHash === txtHash) {
            let match = true;
            for (let k = 0; k < m; k++) {
                if (text[s + k] !== pattern[k]) {
                    match = false;
                    break;
                }
            }
            if (match) result.push(s);
        }

        // Compute hash for next window: remove leading char, add trailing char
        if (s < n - m) {
            txtHash = (txtHash - text.charCodeAt(s) * basePower) % mod;
            if (txtHash < 0) txtHash += mod;                    // keep positive
            txtHash = (txtHash * base + text.charCodeAt(s + m)) % mod;
        }
    }

    return result;
}
const idx = rabinKarp('abc', 'xabcababc');
console.log(idx);   // → [1, 6]
