const lower = myString.toLowerCase();   // standard Unicode‑aware lower‑casing
// Example 1 – simple literal
const greeting = "Hello, WORLD!";
const lowerGreeting = greeting.toLowerCase(); // "hello, world!"

// Example 2 – inside a function
function normalizeName(name: string): string {
  return name.toLowerCase();
}

console.log(normalizeName("Alice")); // "alice"
const turkish = "İstanbul";
const lowerTurkish = turkish.toLocaleLowerCase('tr-TR'); // "ıstanbul"
function safeLowerCase(value: string | null | undefined): string {
  return value?.toLowerCase() ?? "";
}
/**
 * Normalizes any user‑provided text to lower case.
 * Accepts only strings (or null/undefined) and always returns a string.
 */
function normalizeText(input: string | null | undefined): string {
  // Guard against non‑string values at compile‑time
  if (typeof input !== "string") {
    return "";
  }

  // Use locale‑aware conversion if you know the target language
  // return input.toLocaleLowerCase('en-US');

  // Standard Unicode lower‑casing
  return input.toLowerCase();
}

// Demo
const raw = "TypeScript IS Awesome!";
console.log(normalizeText(raw)); // "typescript is awesome!"
const lower = myString.toLowerCase();          // standard
// or, locale‑aware:
const lower = myString.toLocaleLowerCase('en'); // optional locale
