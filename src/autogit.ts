const stringWithSpaces = "  Hello   World  \n\t";
const trimmedString = stringWithSpaces.replace(/\s/g, "");
console.log(trimmedString); // "HelloWorld"
const stringWithSpaces = "  Hello World  ";
const trimmedString = stringWithSpaces.trim();
console.log(trimmedString); // "Hello World"
const stringWithSpaces = "  Hello World";
const trimmedString = stringWithSpaces.trimStart(); // or trimLeft()
console.log(trimmedString); // "Hello World"
const stringWithSpaces = "Hello World  ";
const trimmedString = stringWithSpaces.trimEnd(); // or trimRight()
console.log(trimmedString); // "Hello World"
// Remove only spaces
const stringWithSpaces = "  Hello   World  ";
const noSpaces = stringWithSpaces.replace(/ /g, "");
console.log(noSpaces); // "HelloWorld"

// Remove tabs
const stringWithTabs = "Hello\tWorld";
const noTabs = stringWithTabs.replace(/\t/g, "");
console.log(noTabs); // "HelloWorld"

// Remove new lines
const stringWithNewlines = "Hello\nWorld";
const noNewlines = stringWithNewlines.replace(/\n/g, "");
console.log(noNewlines); // "HelloWorld"
function normalizeSpaces(str: string): string {
    return str.replace(/\s+/g, " ").trim();
}

const messyString = "  Hello     World   ";
const cleanString = normalizeSpaces(messyString);
console.log(cleanString); // "Hello World"
// Remove all whitespace
function removeAllWhitespace(str: string): string {
    return str.replace(/\s/g, "");
}

// Remove extra spaces (keep single spaces between words)
function removeExtraSpaces(str: string): string {
    return str.replace(/\s+/g, " ").trim();
}

// Usage
const result1 = removeAllWhitespace("  Hello   World  ");
const result2 = removeExtraSpaces("  Hello   World  ");
