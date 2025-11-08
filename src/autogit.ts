// Remove all whitespace characters
const str: string = "  Hello   World  ";
const noWhitespace = str.replace(/\s/g, "");
console.log(noWhitespace); // "HelloWorld"

// Remove only spaces (not all whitespace)
const noSpaces = str.replace(/ /g, "");
console.log(noSpaces); // "HelloWorld"
const text: string = "  Hello\tWorld\n  ";

// Remove tabs only
const noTabs = text.replace(/\t/g, "");
console.log(noTabs); // "  HelloWorld\n  "

// Remove newlines only
const noNewlines = text.replace(/\n/g, "");
console.log(noNewlines); // "  Hello\tWorld  "
const str: string = "  Hello World  ";

// Trim from both ends
const trimmed = str.trim();
console.log(trimmed); // "Hello World"

// Trim from start only
const trimmedStart = str.trimStart();
console.log(trimmedStart); // "Hello World  "

// Trim from end only
const trimmedEnd = str.trimEnd();
console.log(trimmedEnd); // "  Hello World"
const str: string = "Hello     World    Today";
const singleSpaced = str.replace(/\s+/g, " ");
console.log(singleSpaced); // "Hello World Today"
// Remove all whitespace
function removeAllWhitespace(text: string): string {
    return text.replace(/\s/g, "");
}

// Remove whitespace but keep single spaces between words
function normalizeSpaces(text: string): string {
    return text.trim().replace(/\s+/g, " ");
}

// Remove specific whitespace characters
function removeSpecificWhitespace(text: string, charsToRemove: string[]): string {
    let result = text;
    charsToRemove.forEach(char => {
        result = result.replace(new RegExp(char, "g"), "");
    });
    return result;
}

// Usage examples
const example = "  Hello\tWorld\n  ";
console.log(removeAllWhitespace(example)); // "HelloWorld"
console.log(normalizeSpaces(example)); // "Hello World"
console.log(removeSpecificWhitespace(example, ["\t", "\n"])); // "  HelloWorld  "
