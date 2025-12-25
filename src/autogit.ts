const original = "Hello, WORLD!";
const lowercased = original.toLowerCase();   // "hello, world!"
toLowerCase(): string;
function makeLowerCase(value: string): string {
  // TypeScript guarantees `value` is a string, so we can safely call the method.
  return value.toLowerCase();
}

// Usage
const result = makeLowerCase("TypeScript IS Awesome!");
console.log(result); // "typescript is awesome!"
function safeLowerCase(value: unknown): string {
  if (typeof value === "string") {
    return value.toLowerCase();
  }
  // Decide what to do for non‑strings – throw, return a default, etc.
  throw new Error("Expected a string");
}
const turkish = "İSTANBUL";
const lowerTurkish = turkish.toLocaleLowerCase('tr-TR'); // "istanbul"
toLocaleLowerCase(locales?: string | string[]): string;
// Simple lower‑case
const lower = "ABC".toLowerCase(); // "abc"

// With a function
function lowerCase(str: string): string {
  return str.toLowerCase();
}

// Locale‑aware
const german = "Straße".toLocaleLowerCase('de-DE'); // "straße"
