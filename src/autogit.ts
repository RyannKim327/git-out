const stringWithSpaces = "Hello World TypeScript";
const stringWithoutSpaces = stringWithSpaces.replace(/\s/g, '');
console.log(stringWithoutSpaces); // "HelloWorldTypeScript"
const stringWithSpaces = "Hello World TypeScript";
const stringWithoutSpaces = stringWithSpaces.replaceAll(' ', '');
console.log(stringWithoutSpaces); // "HelloWorldTypeScript"

// Or using regex with replaceAll
const stringWithoutAnyWhitespace = stringWithSpaces.replaceAll(/\s/g, '');
console.log(stringWithoutAnyWhitespace); // "HelloWorldTypeScript"
const stringWithSpaces = "Hello World TypeScript";
const stringWithoutSpaces = stringWithSpaces.split(' ').join('');
console.log(stringWithoutSpaces); // "HelloWorldTypeScript"

// For all whitespace characters
const stringWithoutAnyWhitespace = stringWithSpaces.split(/\s/).join('');
console.log(stringWithoutAnyWhitespace); // "HelloWorldTypeScript"
const text = "Hello World\tTypeScript\nCode";
const withoutSpaces = text.replace(/ /g, '');
console.log(withoutSpaces); // "HelloWorld\tTypeScript\nCode"
function removeSpaces(text: string): string {
    return text.replace(/\s/g, '');
}

// Or as an arrow function
const removeSpaces = (text: string): string => text.replace(/\s/g, '');

// Usage
const result: string = removeSpaces("Hello World TypeScript");
const text = "Hello World\tTypeScript\nCode";
const result = text.replace(/\s/g, '');
console.log(result); // "HelloWorldTypeScriptCode"
