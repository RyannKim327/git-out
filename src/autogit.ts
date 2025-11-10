const str = "   Hello World!   ";
console.log(str.trim()); // "Hello World!"
console.log(str.trimStart()); // "Hello World!   "
console.log(str.trimEnd()); // "   Hello World!"
const strWithWhitespace = "  Hello \t\nWorld!  ";
console.log(strWithWhitespace.replace(/\s+/g, '')); // "HelloWorld!"
const nullableStr: string | null = null;
const cleaned = nullableStr?.trim() || ""; // Safely handles null
