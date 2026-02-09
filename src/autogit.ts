// 1️⃣ Simple string interpolation (most common)
const a = "hello";
const b = "world";
const c = a + " " + b;          // "hello world"

// 2️⃣ Template literals – works the same but often cleaner
const c2 = `${a} ${b}`;          // "hello world"

// 3️⃣ Array join (useful if you have many parts)
const parts = [a, b];
const c3 = parts.join(" ");      // "hello world"

// 4️⃣ String.prototype.concat (rarely needed)
const c4 = a.concat(" ", b);     // "hello world"
