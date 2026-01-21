const raw = "  hello  world \n\t!";
const cleaned = raw.replace(/\s+/g, "");   // ↓
console.log(cleaned);   // "helloworld!"
const raw = "   hello world   ";
const trimmed = raw.trim();
console.log(trimmed);   // "hello world"
const left = raw.trimStart();  // "hello world   "
const right = raw.trimEnd();   // "   hello world"
const messy = "This   is\nan\t  example.";
const normalised = messy.replace(/\s+/g, " ").trim();
console.log(normalised);   // "This is an example."
const raw = "  a b  ";
const withoutSpaces = raw.replaceAll(" ", "");
