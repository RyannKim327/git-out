// Remove all whitespace, including spaces, tabs, newlines
const stringWithSpaces = "  Hello   World  \n\t";
const noSpaces = stringWithSpaces.replace(/\s/g, "");
console.log(noSpaces); // "HelloWorld"
// Remove whitespace from the beginning of the string
const stringWithSpaces = "   Hello World";
const trimmedStart = stringWithSpaces.replace(/^\s+/, "");
console.log(trimmedStart); // "Hello World"
// Remove whitespace from the end of the string
const stringWithSpaces = "Hello World   ";
const trimmedEnd = stringWithSpaces.replace(/\s+$/, "");
console.log(trimmedEnd); // "Hello World"
// Trim whitespace from both ends (equivalent to String.trim())
const stringWithSpaces = "   Hello World   ";
const trimmed = stringWithSpaces.trim();
console.log(trimmed); // "Hello World"

// Using regex alternative
const trimmedRegex = stringWithSpaces.replace(/^\s+|\s+$/g, "");
// Replace multiple spaces with single spaces
const stringWithSpaces = "Hello    World   from   TypeScript";
const singleSpaces = stringWithSpaces.replace(/\s+/g, " ");
console.log(singleSpaces); // "Hello World from TypeScript"
// Trim and then replace multiple spaces with single spaces
const messyString = "   Hello    World   \t\n";
const cleanString = messyString.trim().replace(/\s+/g, " ");
console.log(cleanString); // "Hello World"
// Utility functions with proper typing
class StringUtils {
  static removeAllWhitespace(str: string): string {
    return str.replace(/\s/g, "");
  }
  
  static trimWhitespace(str: string): string {
    return str.trim();
  }
  
  static normalizeSpaces(str: string): string {
    return str.trim().replace(/\s+/g, " ");
  }
}

// Usage
const result1 = StringUtils.removeAllWhitespace("  Hello World  "); // "HelloWorld"
const result2 = StringUtils.normalizeSpaces("  Hello   World  "); // "Hello World"
