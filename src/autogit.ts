const haystack: string = "Hello, world!";
const needle: string = "world";

const found = haystack.includes(needle); // true
const haystack = "Hello, world!";
const needle = "world";

const found = haystack.indexOf(needle) !== -1; // true
const haystack = "Hello, world!";
const pattern = /world/;          // or /world/i for case‑insensitive
const found = pattern.test(haystack); // true
// case‑insensitive:
const haystack = "Hello, World!";
const needle = "world";
const found = haystack.toLowerCase().includes(needle.toLowerCase());

// locale‑aware:
const localeFound = haystack.localeCompare(needle, undefined, { sensitivity: 'accent' }) === 0;
/**
 * Checks whether a string contains a substring, optionally case‑insensitive.
 */
function contains(
  target: string,
  probe: string,
  caseInsensitive = false
): boolean {
  if (caseInsensitive) {
    return target.toLowerCase().includes(probe.toLowerCase());
  }
  return target.includes(probe);
}

// Usage
const ok = contains("Hello, World!", "world", true); // true
