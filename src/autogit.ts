// Original
const original = "   \tHello, \nWorld!   ";

// 1. trim (only outer whitespace)
const trimmed = original.trim();
console.log(trimmed); // "Hello, \nWorld!"

// 2. remove all literal spaces only
const noSpaces = original.replace(/ /g, "");
console.log(noSpaces); // "\tHello,\nWorld!   "

// 3. strip *every* whitespace
const totallyClean = original.replace(/\s+/g, "");
console.log(totallyClean); // "Hello,World!"
function removeAllWhitespace(s: string): string {
  return s.replace(/\s+/g, "");
}

const cleaned = removeAllWhitespace("  a b\tc\n "); // "abc"
