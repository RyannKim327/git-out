const text: string = "The quick brown fox jumps over the lazy dog";

if (text.includes("brown")) {
  console.log("✅ Found 'brown'!");
}
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["es2016", "dom"]
  }
}
const text = "Hello, world!";

if (text.indexOf("world") !== -1) {
  console.log("✅ 'world' is present");
}
const text = "TypeScript is awesome!";

if (text.search(/awesome/i) !== -1) {   // `i` = case‑insensitive
  console.log("✅ Found (case‑insensitive)!");
}
const pattern = /awesome/i;
if (pattern.test(text)) {
  console.log("✅ test() says it’s there");
}
const maybeString: string | null = getUserInput(); // could be null

if (maybeString?.includes("admin")) {
  console.log("✅ admin keyword present");
}
/**
 * Returns true if `source` contains `sub`, optionally ignoring case.
 */
function contains(
  source: string,
  sub: string,
  caseInsensitive = false
): boolean {
  if (caseInsensitive) {
    return source.toLowerCase().includes(sub.toLowerCase());
  }
  return source.includes(sub);
}

// Usage
if (contains("Hello World", "world", true)) {
  console.log("✅ case‑insensitive match");
}
// src/utils/string.ts
export function contains(
  source: string,
  sub: string,
  caseInsensitive = false
): boolean {
  if (caseInsensitive) {
    return source.toLowerCase().includes(sub.toLowerCase());
  }
  return source.includes(sub);
}

// src/main.ts
import { contains } from "./utils/string";

const sentence = "Learning TypeScript is fun!";

if (contains(sentence, "typescript", true)) {
  console.log("✅ We found the word, ignoring case.");
}
// simplest modern way
if (myString.includes("needle")) { … }

// fallback for very old browsers
if (myString.indexOf("needle") !== -1) { … }
