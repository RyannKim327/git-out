// 1. `includes` – ES6 and newer
const myString = "Hello, TypeScript!";
const hasSub = myString.includes("TypeScript"); // true

// 2. `indexOf` – works everywhere
const hasSubAlt = myString.indexOf("TypeScript") !== -1; // also true

// 3. Regular expression (useful for case‑insensitive or pattern matching)
const hasRegex = /typescript/i.test(myString); // true because /i makes it case‑insensitive
const hasIgnoreCase = myString.toLowerCase().includes("typescript");
