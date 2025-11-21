/**
 * Rabin–Karp string search
 * @param text    string to search in
 * @param pattern string to search for
 * @returns index of first match, or -1
 */
export function rabinKarp(text: string, pattern: string): number {
  if (pattern.length === 0) return 0;
  if (pattern.length > text.length) return -1;

  const base = 256;               // alphabet size (extended ASCII)
  const prime = 2_147_483_647;    // large prime < 2³¹

  const m = pattern.length;
  const n = text.length;

  let patternHash = 0;            // hash of the pattern
  let currentHash = 0;            // hash of current window
  let highOrder = 1;                // base^(m-1) % prime

  // Pre-compute base^(m-1) % prime
  for (let i = 1; i < m; ++i) {
    highOrder = (highOrder * base) % prime;
  }

  // Initial hashes
  for (let i = 0; i < m; ++i) {
    patternHash = (base * patternHash + pattern.charCodeAt(i)) % prime;
    currentHash = (base * currentHash + text.charCodeAt(i)) % prime;
  }

  // Slide over the text
  for (let i = 0; i <= n - m; ++i) {
    // Hash match ⇒ compare characters to avoid false positives
    if (patternHash === currentHash) {
      let j = 0;
      while (j < m && text[i + j] === pattern[j]) ++j;
      if (j === m) return i;
    }

    // Roll hash one step to the right (unless at last window)
    if (i < n - m) {
      currentHash =
        (base *
          (currentHash -
            text.charCodeAt(i) * highOrder) +
          text.charCodeAt(i + m)) %
        prime;

      // Handle negative modulo
      if (currentHash < 0) currentHash += prime;
    }
  }
  return -1;
}

/* ---------- Example usage ---------- */
if (require.main === module) {
  const t = "abracadabra";
  const p = "cada";
  console.log(rabinKarp(t, p)); // → 4
}
