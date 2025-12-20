const text: string = "The quick brown fox jumps over the lazy dog";

if (text.includes("brown")) {
  console.log("✅ Found 'brown'");
}
if (!String.prototype.includes) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (String.prototype as any).includes = function (search: string, start = 0) {
    return this.indexOf(search, start) !== -1;
  };
}
const text: string = "Hello, world!";

if (text.indexOf("world") !== -1) {
  console.log("✅ Found 'world'");
}
const text: string = "TypeScript is awesome!";

// Case‑insensitive search
const pattern = /typescript/i;   // the `i` flag makes it case‑insensitive

if (pattern.test(text)) {
  console.log("✅ Found 'typescript' (case‑insensitive)");
}
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole match
}

function contains(text: string, sub: string, caseInsensitive = false): boolean {
  const escaped = escapeRegExp(sub);
  const flags = caseInsensitive ? 'i' : '';
  const regex = new RegExp(escaped, flags);
  return regex.test(text);
}

// Example
contains("Hello *world*", "*world*"); // true
/**
 * Returns true if `source` contains `search`, optionally ignoring case.
 */
export function containsSubstring(
  source: string,
  search: string,
  options?: { ignoreCase?: boolean }
): boolean {
  if (options?.ignoreCase) {
    return source.toLowerCase().includes(search.toLowerCase());
  }
  return source.includes(search);
}

// Usage
containsSubstring("FooBar", "bar", { ignoreCase: true }); // true
function safeContains(source: string | null | undefined, sub: string): boolean {
  return !!source?.includes(sub);
}

// Example
safeContains(undefined, "test"); // false
const sentence: string = "Learning TypeScript is fun!";

// 1️⃣ includes (ES6)
const hasTS1 = sentence.includes("TypeScript");

// 2️⃣ indexOf (pre‑ES6)
const hasTS2 = sentence.indexOf("TypeScript") !== -1;

// 3️⃣ regex (case‑insensitive)
const hasTS3 = /typescript/i.test(sentence);

console.log({ hasTS1, hasTS2, hasTS3 });
// → { hasTS1: true, hasTS2: true, hasTS3: true }
