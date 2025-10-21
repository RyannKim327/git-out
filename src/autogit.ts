const str = "  Hello   World!  \n\t  ";

// Using replace() with a regex to remove all whitespace
const noWhitespace = str.replace(/\s/g, '');
console.log(noWhitespace); // "HelloWorld!"
const str = "  Hello World!  ";

// Using built-in trim() method
const trimmed = str.trim();
console.log(trimmed); // "Hello World!"
const str = "  Hello   World!  \n\t  ";

// Trim leading/trailing whitespace, then remove internal spaces
const clean = str.trim().replace(/\s+/g, ' ');
console.log(clean); // "Hello World!"
const str = "Hello\nWorld\tTest  ";

// Remove only newlines and tabs, keep regular spaces
const specific = str.replace(/[\n\t]/g, '');
console.log(specific); // "Hello World Test  "
