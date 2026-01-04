// Remove all whitespace (spaces, tabs, newlines)
const stringWithSpaces = "  Hello  World  \t\n";
const noWhitespace = stringWithSpaces.replace(/\s/g, "");
console.log(noWhitespace); // "HelloWorld"
const stringWithSpaces = "   Hello World";
const trimmedStart = stringWithSpaces.replace(/^\s+/, "");
console.log(trimmedStart); // "Hello World"
const stringWithSpaces = "Hello World   ";
const trimmedEnd = stringWithSpaces.replace(/\s+$/, "");
console.log(trimmedEnd); // "Hello World"
const stringWithSpaces = "   Hello World   ";
const trimmedBoth = stringWithSpaces.trim();
console.log(trimmedBoth); // "Hello World"
const stringWithSpaces = "  Hello   World  \t\n";
const normalized = stringWithSpaces.replace(/\s+/g, " ").trim();
console.log(normalized); // "Hello World"
const stringWithSpaces = "  Hello World  ";

// Trim both ends
const trimmed = stringWithSpaces.trim();

// Trim start only
const trimmedStart = stringWithSpaces.trimStart(); // or trimLeft()

// Trim end only
const trimmedEnd = stringWithSpaces.trimEnd(); // or trimRight()
function removeWhitespace(str: string, type: 'all' | 'ends' | 'start' | 'end' = 'all'): string {
  switch (type) {
    case 'all':
      return str.replace(/\s/g, "");
    case 'ends':
      return str.trim();
    case 'start':
      return str.trimStart();
    case 'end':
      return str.trimEnd();
    default:
      return str;
  }
}

// Usage examples
const text = "  Hello  World  \t\n";
console.log(removeWhitespace(text, 'all'));   // "HelloWorld"
console.log(removeWhitespace(text, 'ends'));  // "Hello  World"
console.log(removeWhitespace(text, 'start')); // "Hello  World  "
console.log(removeWhitespace(text, 'end'));   // "  Hello  World"
