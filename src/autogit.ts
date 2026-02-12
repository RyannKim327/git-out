const str = "Hello, TypeScript world!";

console.log(str.includes("TypeScript")); // true
console.log(str.indexOf("world") !== -1); // true

// Case‑insensitive search
const pattern = /typescript/i;
console.log(pattern.test(str)); // true
function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const sub = "a+b*?"; // contains regex meta‑chars
const safePattern = new RegExp(escapeRegExp(sub), 'i');
console.log(safePattern.test(str)); // correct result
str.toLowerCase().includes(sub.toLowerCase());
