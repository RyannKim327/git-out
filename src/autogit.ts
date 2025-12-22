const stringWithSpaces = "Hello World TypeScript";
const stringWithoutSpaces = stringWithSpaces.replace(/\s/g, '');

console.log(stringWithoutSpaces); // "HelloWorldTypeScript"
const stringWithSpaces = "Hello World TypeScript";
const stringWithoutSpaces = stringWithSpaces.split(' ').join('');

console.log(stringWithoutSpaces); // "HelloWorldTypeScript"
const stringWithWhitespace = "Hello\tWorld\nTypeScript";
const stringWithoutWhitespace = stringWithWhitespace.replace(/\s+/g, '');

console.log(stringWithoutWhitespace); // "HelloWorldTypeScript"
function removeSpaces(input: string): string {
    return input.replace(/\s/g, '');
}

// Usage
const result = removeSpaces("Hello World TypeScript");
console.log(result); // "HelloWorldTypeScript"
function removeAllWhitespace(input: string): string {
    return input.replace(/\s+/g, '');
}

// Usage
const text = "Hello   World\n\tTypeScript";
const cleanText = removeAllWhitespace(text);
console.log(cleanText); // "HelloWorldTypeScript"
