// 1. The classic + operator
const a = "Hello";
const b = "world!";
const c = a + " " + b;   // "Hello world!"

// 2. Template literals (better for readability, especially with variables)
const d = `${a} ${b}`;   // "Hello world!"
const firstName = "Ada";
const lastName = "Lovelace";
const greeting = `Good morning, ${firstName} ${lastName}!`; // Good morning, Ada Lovelace!
const a: string | null = null;
const b = "world!";
const result = `${a ?? ""}${b}`;  // avoids “nullworld!”
