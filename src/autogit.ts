/**
 * Simpler Rabin–Karp – uses a 32‑bit unsigned int hash.
 * For stronger use (large text / collision safety) switch to BigInt or a
 * larger mod (e.g., 1_000_000_007).
 */
export function rabinKarp(
    text: string,
    pattern: string,
    base: number = 256,               // alphabet size
    mod: number = 1_000_000_007       // a large prime
): number[] {
    const n = text.length;
    const m = pattern.length;
    if (m === 0 || n < m) return [];

    const result: number[] = [];

    /* Pre‑compute base^(m-1) % mod   (the weight of the leading char) */
    let power = 1;
    for (let i = 0; i < m - 1; i++) power = (power * base) % mod;

    /* Hashes of pattern and first window */
    let patternHash = 0;
    let windowHash = 0;
    for (let i = 0; i < m; i++) {
        patternHash = (patternHash * base + pattern.charCodeAt(i)) % mod;
        windowHash  = (windowHash  * base + text.charCodeAt(i))  % mod;
    }

    /* Slide the window */
    for (let i = 0; i <= n - m; i++) {
        /* If hashes match – do a literal check to avoid false positives */
        if (patternHash === windowHash) {
            if (text.substr(i, m) === pattern) result.push(i);
        }

        /* Re‑hash: remove leading char, add trailing char */
        if (i < n - m) {
            const leading = text.charCodeAt(i) * power % mod;
            windowHash = (windowHash - leading + mod) % mod;   // avoid negative
            windowHash = (windowHash * base + text.charCodeAt(i + m)) % mod;
        }
    }

    return result;
}
import { rabinKarp } from './rabinKarp';

const text = "ababcabcabababd";
const pattern = "ababd";

const matches = rabinKarp(text, pattern);  // → [10]
console.log("Match at indices: ", matches);
