const str = "  Hello  World  ";
const result = str.replace(/\s/g, "");
console.log(result); // "HelloWorld"
const str = "  Hello  World  ";
const result = str.trim();
console.log(result); // "Hello  World"
const str = "  Hello  World  ";
const result = str.trimStart();
console.log(result); // "Hello  World  "
const str = "  Hello  World  ";
const result = str.trimEnd();
console.log(result); // "  Hello  World"
const str = "  Hello     World  ";
const result = str.replace(/\s+/g, " ");
console.log(result); // " Hello World "
const str = "  Hello\tWorld\n";
const result = str.replace(/\s/g, "");
console.log(result); // "HelloWorld"
// Remove all whitespace
function removeAllWhitespace(str: string): string {
    return str.replace(/\s/g, "");
}

// Remove extra spaces (multiple spaces → single space)
function normalizeSpaces(str: string): string {
    return str.replace(/\s+/g, " ").trim();
}

// Usage
const input = "  Hello   World\t!\n";
console.log(removeAllWhitespace(input)); // "HelloWorld!"
console.log(normalizeSpaces(input));     // "Hello World !"
function removeWhitespace(str: string | null | undefined): string {
    if (!str) return "";
    return str.replace(/\s/g, "");
}

// Handles null/undefined safely
const result = removeWhitespace(somePossiblyNullString);
