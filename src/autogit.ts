const text: string = "The quick brown fox jumps over the lazy dog";

if (text.includes("brown")) {
  console.log("✅ Found 'brown'");
}
const text: string = "Hello, World!";

if (text.indexOf("World") !== -1) {
  console.log("✅ Found 'World'");
}
const text: string = "User: john.doe@example.com";

const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i; // i = case‑insensitive

if (emailPattern.test(text)) {
  console.log("✅ Looks like an e‑mail address");
}
/**
 * Returns true if `source` contains `search`, optionally ignoring case.
 */
function contains(
  source: string,
  search: string,
  caseInsensitive: boolean = false
): boolean {
  if (caseInsensitive) {
    return source.toLowerCase().includes(search.toLowerCase());
  }
  return source.includes(search);
}

// Usage
const sentence = "TypeScript is awesome!";
console.log(contains(sentence, "script"));          // true
console.log(contains(sentence, "SCRIPT", true));   // true
function safeContains(
  source: string | null | undefined,
  search: string
): boolean {
  return typeof source === "string" && source.includes(search);
}

// Example
const maybeString: string | null = getUserInput(); // could be null
if (safeContains(maybeString, "admin")) {
  // …
}
if (!String.prototype.includes) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (String.prototype as any).includes = function (search: string, start?: number) {
    if (typeof start !== "number") {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}
// 1️⃣ Simple includes (ES6+)
const hasFoo = "foobar".includes("foo"); // true

// 2️⃣ indexOf fallback
const hasBar = "foobar".indexOf("bar") !== -1; // true

// 3️⃣ Case‑insensitive
const hasBaz = "FoObAr".toLowerCase().includes("baz".toLowerCase()); // false

// 4️⃣ Regex (CI)
const hasQux = /qux/i.test("QuXy"); // true
