str.includes(searchString: string, position?: number): boolean
const phrase: string = "The quick brown fox jumps over the lazy dog";

if (phrase.includes("brown")) {
  console.log("Found the word 'brown'!");
}
// Look for "the" only after the first 10 characters
if (phrase.includes("the", 10)) {
  console.log("Found a later 'the'");
}
str.indexOf(searchString: string, position?: number): number
if (phrase.indexOf("fox") !== -1) {
  console.log("There's a fox in the phrase.");
}
regex.test(str: string): boolean
const pattern = /lazy/i; // `i` flag = case‑insensitive

if (pattern.test(phrase)) {
  console.log("Found 'lazy' regardless of case.");
}
const word = "fox";
const wordRegex = new RegExp(`\\b${word}\\b`); // \b = word boundary

if (wordRegex.test(phrase)) {
  console.log("Exact word 'fox' found.");
}
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
const safePattern = new RegExp(escapeRegExp(userInput));
if (phrase.search(/quick/) !== -1) {
  console.log("Found 'quick'");
}
/**
 * Returns true if `source` contains `sub` (case‑sensitive by default).
 */
function contains(
  source: string,
  sub: string,
  options?: { ignoreCase?: boolean }
): boolean {
  if (options?.ignoreCase) {
    return source.toLowerCase().includes(sub.toLowerCase());
  }
  return source.includes(sub);
}

// Usage
const hasHello = contains("Hello World", "hello", { ignoreCase: true });
const text = "TypeScript is awesome!";

// 1️⃣ Simple contains (case‑sensitive)
const hasTS = text.includes("Script"); // true

// 2️⃣ Simple contains (case‑insensitive)
const hasTSci = text.toLowerCase().includes("typescript".toLowerCase()); // true

// 3️⃣ Index of (position needed)
const pos = text.indexOf("awesome"); // 18 (or -1 if not found)

// 4️⃣ RegExp test (case‑insensitive)
const hasAwesome = /awesome/i.test(text); // true

// 5️⃣ Whole‑word RegExp
const wholeWord = /\bawesome\b/.test(text); // true

// 6️⃣ Helper utility
function contains(source: string, sub: string, ignoreCase = false): boolean {
  return ignoreCase
    ? source.toLowerCase().includes(sub.toLowerCase())
    : source.includes(sub);
}
