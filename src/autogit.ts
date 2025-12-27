const text = "The quick brown fox jumps over the lazy dog";

if (text.includes("brown")) {
  console.log("✅ substring found!");
}
function containsSubstring(
  source: string,
  sub: string,
  startPos: number = 0
): boolean {
  return source.includes(sub, startPos);
}

// Usage
console.log(containsSubstring("Hello, world!", "world")); // true
console.log(containsSubstring("Hello, world!", "World")); // false (case‑sensitive)
function containsSubstringLegacy(source: string, sub: string): boolean {
  return source.indexOf(sub) !== -1;
}
function containsRegex(source: string, pattern: string, flags: string = ""): boolean {
  const re = new RegExp(pattern, flags);
  return re.test(source);
}

// Case‑insensitive search
console.log(containsRegex("Hello, World!", "world", "i")); // true
function safeContains(source: string | null | undefined, sub: string): boolean {
  return source?.includes(sub) ?? false;
}
if (!String.prototype.includes) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (String.prototype as any).includes = function (search: string, start: number = 0) {
    if (this == null) {
      throw new TypeError('String.prototype.includes called on null or undefined');
    }
    const str = String(this);
    if (search instanceof RegExp) {
      throw new TypeError('first argument must not be a RegExp');
    }
    return str.indexOf(search, start) !== -1;
  };
}
/**
 * Checks whether `source` contains `sub`.
 *
 * @param source   The string to search in.
 * @param sub      The substring to look for.
 * @param options  Optional configuration:
 *                 - `ignoreCase`: perform a case‑insensitive search.
 *                 - `fromIndex`: start searching from this index (default 0).
 */
export function contains(
  source: string,
  sub: string,
  options?: { ignoreCase?: boolean; fromIndex?: number }
): boolean {
  const { ignoreCase = false, fromIndex = 0 } = options ?? {};

  if (ignoreCase) {
    // Fast path using lower‑casing (good enough for most Latin scripts)
    return source
      .toLowerCase()
      .includes(sub.toLowerCase(), fromIndex);
  }

  // Native includes (ES2016+)
  return source.includes(sub, fromIndex);
}

// Example usage
console.log(contains("TypeScript", "script"));               // true
console.log(contains("TypeScript", "SCRIPT", { ignoreCase: true })); // true
console.log(contains("Hello", "world"));                     // false
// 1️⃣ Simple check (ES2016+)
const hasFoo = "foobar".includes("foo");

// 2️⃣ Legacy fallback
const hasBar = "foobar".indexOf("bar") !== -1;

// 3️⃣ Case‑insensitive
const hasBaz = /baz/i.test("Bazzinga");

// 4️⃣ Safe with possible null/undefined
const safeCheck = (s?: string) => s?.includes("test") ?? false;
