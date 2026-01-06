const original: string = "Hello, WORLD!";
const lowercased: string = original.toLowerCase();

console.log(lowercased); // "hello, world!"
function safeLowerCase(value?: string | null): string {
  // Returns an empty string for null/undefined, otherwise the lowered value
  return value?.toLowerCase() ?? "";
}

// Examples
console.log(safeLowerCase("TeSt")); // "test"
console.log(safeLowerCase(undefined)); // ""
const turkish = "İSTANBUL";
console.log(turkish.toLocaleLowerCase('tr-TR')); // "istanbul"
function lowerIfString(value: unknown): string | unknown {
  if (typeof value === "string") {
    return value.toLowerCase();
  }
  return value; // not a string, return as‑is or handle differently
}
const lower = myString.toLowerCase();   // simple, works for any string
