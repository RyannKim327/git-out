const stringWithSpaces = "Hello World TypeScript";
const stringWithoutSpaces = stringWithSpaces.replace(/\s/g, '');

console.log(stringWithoutSpaces); // "HelloWorldTypeScript"
const stringWithSpaces = "Hello World TypeScript";
const stringWithoutSpaces = stringWithSpaces.replaceAll(' ', '');

console.log(stringWithoutSpaces); // "HelloWorldTypeScript"
const stringWithSpaces = "Hello World TypeScript";
const stringWithoutSpaces = stringWithSpaces.split(' ').join('');

console.log(stringWithoutSpaces); // "HelloWorldTypeScript"
const stringWithWhitespace = "Hello\tWorld\nTypeScript";
const stringWithoutWhitespace = stringWithWhitespace.replace(/\s/g, '');

console.log(stringWithoutWhitespace); // "HelloWorldTypeScript"
function removeSpaces(str: string): string {
    return str.replace(/\s/g, '');
}

// Usage
const result = removeSpaces("Hello World TypeScript");
console.log(result); // "HelloWorldTypeScript"
const stringWithSpaces = "Hello World\tTypeScript\nCode";
const result = stringWithSpaces.replace(/ /g, '');

console.log(result); // "HelloWorld\tTypeScript\nCode"
// This is the most versatile and commonly used approach
const cleanString = yourString.replace(/\s/g, '');
