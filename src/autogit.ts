const str = " H e llo   W o r l d ";
const noWhitespace = str.replace(/\s+/g, '');
console.log(noWhitespace); // "HelloWorld"
const str = "   Hello World   ";
const trimmed = str.trim();
console.log(trimmed); // "Hello World"
const str = "Hello    World! How   are   you?";
const normalized = str.replace(/\s+/g, ' ');
console.log(normalized); // "Hello World! How are you?"
