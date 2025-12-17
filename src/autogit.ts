const str = "  Hello  World\n\t";
const result = str.replace(/\s/g, ''); // "HelloWorld"
const str = "   Hello World";
const result = str.replace(/^\s+/, ''); // "Hello World"
const str = "Hello World   ";
const result = str.replace(/\s+$/, ''); // "Hello World"
const str = "   Hello World   ";
const result = str.trim(); // "Hello World"
const str = "  Hello  World  ";
const result = str.split(' ').join(''); // "HelloWorld"
const str = "  Hello    World   ";
const result = str.replace(/\s+/g, ' ').trim(); // "Hello World"
// Remove all whitespace
function removeAllWhitespace(input: string): string {
  return input.replace(/\s/g, '');
}

// Trim and normalize internal whitespace
function normalizeWhitespace(input: string): string {
  return input.replace(/\s+/g, ' ').trim();
}

// Usage
const myString = "  Hello  \t World\n ";
console.log(removeAllWhitespace(myString)); // "HelloWorld"
console.log(normalizeWhitespace(myString)); // "Hello World"
