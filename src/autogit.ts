const original = "  Hello,  world!\nThis is\ta test.   ";

const noWhitespace = original.replace(/\s+/g, "");

console.log(noWhitespace);
// → "Hello,world!Thisisatest."
const noWhitespace = original.replaceAll(/\s/g, "");
const trimmed = original.trim();
console.log(trimmed);
// → "Hello,  world!\nThis is\ta test."
const removedSpaces = original.replace(/ /g, "");
// or using a character class if you want tabs too: /[ \t]/g
