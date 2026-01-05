const stringWithSpaces = "Hello World Type Script";
const stringWithoutSpaces = stringWithSpaces.replace(/\s/g, "");
console.log(stringWithoutSpaces); // "HelloWorldTypeScript"
const stringWithSpaces = "Hello World Type Script";
const stringWithoutSpaces = stringWithSpaces.replaceAll(" ", "");
console.log(stringWithoutSpaces); // "HelloWorldTypeScript"
const stringWithSpaces = "Hello World Type Script";
const stringWithoutSpaces = stringWithSpaces.split(" ").join("");
console.log(stringWithoutSpaces); // "HelloWorldTypeScript"
const stringWithWhitespace = "Hello\tWorld\nType Script";
const stringWithoutWhitespace = stringWithWhitespace.replace(/\s/g, "");
console.log(stringWithoutWhitespace); // "HelloWorldTypeScript"
function removeSpaces(str: string): string {
    return str.replace(/\s/g, "");
}

// Usage
const result = removeSpaces("Hello World"); // Type: string
console.log(result); // "HelloWorld"
