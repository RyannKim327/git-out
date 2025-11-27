const str: string = "  Hello  World\t\n";
const noWhitespace = str.replace(/\s/g, '');
console.log(noWhitespace); // "HelloWorld"
const str: string = "   Hello World   ";

// Remove both leading and trailing whitespace
const trimmed = str.trim(); // "Hello World"

// Remove only leading whitespace
const trimmedStart = str.trimStart(); // "Hello World   "

// Remove only trailing whitespace
const trimmedEnd = str.trimEnd(); // "   Hello World"
const str: string = "  Hello \t World\n ";
const noSpaces = str.replace(/ /g, '');
console.log(noSpaces); // "Hello\tWorld\n"
const str: string = "Hello    World";
const cleaned = str.replace(/\s+/g, ' '); // "Hello World"
