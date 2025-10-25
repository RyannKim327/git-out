const stringWithSpaces = "Hello World TypeScript";
const stringWithoutSpaces = stringWithSpaces.replace(/\s/g, "");
console.log(stringWithoutSpaces); // "HelloWorldTypeScript"
const stringWithSpaces = "Hello World TypeScript";
const stringWithoutSpaces = stringWithSpaces.replaceAll(" ", "");
console.log(stringWithoutSpaces); // "HelloWorldTypeScript"
const stringWithSpaces = "Hello World TypeScript";
const stringWithoutSpaces = stringWithSpaces.split(" ").join("");
console.log(stringWithoutSpaces); // "HelloWorldTypeScript"
const stringWithWhitespace = "Hello\tWorld\nTypeScript";
const stringWithoutWhitespace = stringWithWhitespace.replace(/\s+/g, "");
console.log(stringWithoutWhitespace); // "HelloWorldTypeScript"
function removeSpaces(str: string): string {
    return str.replace(/\s/g, "");
}

// Usage
const result = removeSpaces("Hello World TypeScript");
console.log(result); // "HelloWorldTypeScript"
// Regular spaces
"Hello World".replace(/\s/g, ""); // "HelloWorld"

// Multiple spaces
"Hello   World".replace(/\s/g, ""); // "HelloWorld"

// Mixed whitespace (spaces, tabs, newlines)
"Hello\tWorld\nTypeScript".replace(/\s/g, ""); // "HelloWorldTypeScript"
