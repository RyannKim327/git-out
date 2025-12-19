const lower = myString.toLowerCase();   // → all characters become lowercase
function toLower(s: string): string {
  return s.toLowerCase();
}

const original = "Hello, WORLD!";
const lower = toLower(original); // "hello, world!"
const turkish = "İSTANBUL";
const lowerTr = turkish.toLocaleLowerCase('tr-TR'); // "istanbul"
function safeToLower(value: string | null | undefined): string {
  return value?.toLowerCase() ?? "";
}

// Usage
const maybeString: string | null = getFromApi(); // could be null
const lower = safeToLower(maybeString);
function anyToLower<T>(value: T): string {
  return String(value).toLowerCase();
}

// Example
anyToLower(12345);          // "12345"
anyToLower(true);           // "true"
anyToLower({ name: "Bob" }); // "[object object]"
const lower = myString.toLowerCase();          // basic
const lowerTr = myString.toLocaleLowerCase('tr-TR'); // locale‑aware
