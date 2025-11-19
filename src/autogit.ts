// 1. Strip every whitespace character
const removeAllWhitespace = (str: string): string =>
  str.replace(/\s+/g, '');

// 2. Trim only (built-in)
const trimmed = someString.trim();

// 3. Trim + collapse inner runs of whitespace to a single space
const normalizeSpace = (str: string): string =>
  str.trim().replace(/\s+/g, ' ');
console.log(removeAllWhitespace('  a b \t c\n'));   // "abc"
console.log('  hello   world  \n'.trim());        // "hello   world"
console.log(normalizeSpace('  hello   world  \n'));  // "hello world"
