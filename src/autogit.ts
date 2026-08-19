const original = "Hello, World!";
const lower = original.toLowerCase();   // "hello, world!"
// Example: filter an array case‑insensitively
const fruits = ["Apple", "BANANA", "Cherry"];
const search = "baNANA";

const matched = fruits.filter(f =>
  f.toLowerCase().includes(search.toLowerCase())
);
// matched => ["BANANA"]
