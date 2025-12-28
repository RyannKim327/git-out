const stringWithSpaces = "Hello World Example";
const stringWithoutSpaces = stringWithSpaces.replace(/\s/g, "");

console.log(stringWithoutSpaces); // "HelloWorldExample"
const stringWithSpaces = "Hello World Example";
const stringWithoutSpaces = stringWithSpaces.replaceAll(" ", "");

console.log(stringWithoutSpaces); // "HelloWorldExample"
const stringWithSpaces = "Hello World Example";
const stringWithoutSpaces = stringWithSpaces.split(" ").join("");

console.log(stringWithoutSpaces); // "HelloWorldExample"
const stringWithWhitespace = "Hello\tWorld\nExample";
const cleanString = stringWithWhitespace.replace(/\s/g, "");

console.log(cleanString); // "HelloWorldExample"
function removeSpaces(input: string): string {
    return input.replace(/\s/g, "");
}

// Usage
const text: string = "This is a test string";
const result: string = removeSpaces(text);
console.log(result); // "Thisisateststring"
