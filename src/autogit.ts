/**
 * Return true if `a` and `b` contain the same letters in any order.
 *
 * The function is case‑insensitive and skips any non‑alphanumeric
 * characters (e.g. spaces, punctuation). If you want stricter rules,
 * just comment out the cleanup lines.
 */
function areAnagrams(a: string, b: string): boolean {
  // 1️⃣ Normalise: lowercase, strip non‑alphanumerics
  const clean = (s: string) =>
    s.replace(/[^a-z0-9]/gi, "").toLowerCase();

  const cleanA = clean(a);
  const cleanB = clean(b);

  // 2️⃣ Quick length check – avoids extra work
  if (cleanA.length !== cleanB.length) return false;

  // 3️⃣ Count frequency of each character in `cleanA`
  const freq: Record<string, number> = {};

  for (const ch of cleanA) {
    freq[ch] = (freq[ch] ?? 0) + 1;
  }

  // 4️⃣ Decrement using characters from `cleanB`
  for (const ch of cleanB) {
    if (!freq[ch]) return false; // missing char or too many of it
    freq[ch]!--;                  // (non‑null assertion OK here)
  }

  // 5️⃣ All frequencies should be zero now
  return Object.values(freq).every(v => v === 0);
}
console.log(areAnagrams("listen", "silent"));          // true
console.log(areAnagrams("Triangle", "Integral"));      // true
console.log(areAnagrams("Hello!", "oellH"));           // true  (ignores punctuation)
console.log(areAnagrams("Square", "Quears  "));        // true  (ignores spaces)
console.log(areAnagrams("Hello", "world"));            // false
