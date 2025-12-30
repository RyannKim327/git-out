const stringWithSpaces = "Hello World TypeScript";
const stringWithoutSpaces = stringWithSpaces.replace(/\s/g, "");

console.log(stringWithoutSpaces); // "HelloWorldTypeScript"
const stringWithSpaces = "Hello World TypeScript";
const stringWithoutSpaces = stringWithSpaces.replaceAll(" ", "");

// Using regex with replaceAll for all whitespace
const stringWithoutSpaces2 = stringWithSpaces.replaceAll(/\s/g, "");

console.log(stringWithoutSpaces); // "HelloWorldTypeScript"
const stringWithSpaces = "Hello World\tTypeScript\nCode";
const stringWithoutSpaces = stringWithSpaces.replace(/ /g, "");

console.log(stringWithoutSpaces); // "HelloWorld\tTypeScript\nCode"
const stringWithSpaces = "Hello World TypeScript";
const stringWithoutSpaces = stringWithSpaces.split(" ").join("");

console.log(stringWithoutSpaces); // "HelloWorldTypeScript"
const stringWithSpaces = "Hello World TypeScript";
const stringWithoutSpaces = Array.from(stringWithSpaces)
    .filter(char => char !== " ")
    .join("");

console.log(stringWithoutSpaces); // "HelloWorldTypeScript"
function removeSpaces(text: string): string {
    return text.replace(/\s/g, "");
}

// Usage
const result: string = removeSpaces("Hello World TypeScript");
console.log(result); // "HelloWorldTypeScript"
