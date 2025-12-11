const text: string = "The quick brown fox jumps over the lazy dog";

if (text.includes("brown")) {
  console.log("✅ Found it!");
}
// start index (default = 0)
text.includes("fox", 10); // false – search starts at position 10
if (text.indexOf("brown") !== -1) {
  console.log("✅ Found it!");
}
const pattern = /brown/i; // `i` flag = case‑insensitive
if (pattern.test(text)) {
  console.log("✅ Found it (case‑insensitive)!");
}
function containsSubstring(
  source: string,
  sub: string,
  caseSensitive = true
): boolean {
  const escaped = sub.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escape meta‑chars
  const flags = caseSensitive ? '' : 'i';
  const regex = new RegExp(escaped, flags);
  return regex.test(source);
}
/**
 * Returns true if `source` contains `search`, optionally ignoring case.
 */
export function contains(
  source: string,
  search: string,
  options?: { caseSensitive?: boolean; startIndex?: number }
): boolean {
  const { caseSensitive = true, startIndex = 0 } = options ?? {};

  if (!caseSensitive) {
    source = source.toLowerCase();
    search = search.toLowerCase();
  }

  // `includes` is the most readable; fallback to `indexOf` for older runtimes.
  return typeof source.includes === 'function'
    ? source.includes(search, startIndex)
    : source.indexOf(search, startIndex) !== -1;
}

// Usage
if (contains("Hello World", "world", { caseSensitive: false })) {
  console.log("✅ case‑insensitive match!");
}
// 1️⃣ includes (ES6)
text.includes(substring);               // true / false
text.includes(substring, startIdx);     // start at `startIdx`

// 2️⃣ indexOf (pre‑ES6)
text.indexOf(substring) !== -1;         // true / false
text.indexOf(substring, startIdx) !== -1;

// 3️⃣ regex
/substring/.test(text);                 // case‑sensitive
/substring/i.test(text);                // case‑insensitive
new RegExp(escaped, flags).test(text);

// 4️⃣ helper
contains(text, substring, { caseSensitive: false });
