// Using regular expression
const str = "  Hello  World\t\n";
const noWhitespace = str.replace(/\s/g, "");
console.log(noWhitespace); // "HelloWorld"
const str = "  Hello  World\t\n";
const noSpaces = str.replace(/ /g, "");
console.log(noSpaces); // "HelloWorld\t\n"
const str = "  Hello World  ";
const trimmed = str.trim();
console.log(trimmed); // "Hello World"

// Also available: trimStart() and trimEnd()
const startTrimmed = str.trimStart();
const endTrimmed = str.trimEnd();
const str = "  Hello    World  ";
const normalized = str.replace(/\s+/g, " ").trim();
console.log(normalized); // "Hello World"
function removeWhitespace(input: string, type: 'all' | 'spaces' | 'trim' | 'normalize' = 'all'): string {
  switch (type) {
    case 'all':
      return input.replace(/\s/g, "");
    case 'spaces':
      return input.replace(/ /g, "");
    case 'trim':
      return input.trim();
    case 'normalize':
      return input.replace(/\s+/g, " ").trim();
    default:
      return input;
  }
}

// Usage examples
const str = "  Hello    World\t\n";
console.log(removeWhitespace(str, 'all'));       // "HelloWorld"
console.log(removeWhitespace(str, 'spaces'));    // "HelloWorld\t\n"
console.log(removeWhitespace(str, 'trim'));      // "Hello    World\t\n"
console.log(removeWhitespace(str, 'normalize')); // "Hello World"
// Remove only tabs
const noTabs = str.replace(/\t/g, "");

// Remove only newlines
const noNewlines = str.replace(/\n/g, "");

// Remove carriage returns
const noCarriageReturns = str.replace(/\r/g, "");
