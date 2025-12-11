const str = "Hello World TypeScript";
const noSpaces = str.replace(/\s/g, '');
console.log(noSpaces); // "HelloWorldTypeScript"
const str = "Hello World TypeScript";
const noSpaces = str.replaceAll(' ', '');
console.log(noSpaces); // "HelloWorldTypeScript"
const str = "Hello World TypeScript";
const noSpaces = str.split(' ').join('');
console.log(noSpaces); // "HelloWorldTypeScript"
const str = "Hello\tWorld\nTypeScript";
const noWhitespace = str.replace(/\s+/g, '');
console.log(noWhitespace); // "HelloWorldTypeScript"
// Generic function
function removeSpaces(text: string): string {
    return text.replace(/\s/g, '');
}

// Remove only regular spaces
function removeRegularSpaces(text: string): string {
    return text.replace(/ /g, '');
}

// Remove all whitespace characters
function removeAllWhitespace(text: string): string {
    return text.replace(/\s+/g, '');
}

// Usage
const result1 = removeSpaces("Hello World"); // "HelloWorld"
const result2 = removeRegularSpaces("Hello World"); // "HelloWorld"
const result3 = removeAllWhitespace("Hello\tWorld\n!"); // "HelloWorld!"
