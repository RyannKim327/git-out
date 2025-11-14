const stringWithSpaces = "Hello World 123";
const stringWithoutSpaces = stringWithSpaces.replace(/\s/g, "");
console.log(stringWithoutSpaces); // Output: "HelloWorld123"
const stringWithSpaces = "Hello World 123";
const stringWithoutSpaces = stringWithSpaces.replace(/ /g, "");
console.log(stringWithoutSpaces); // Output: "HelloWorld123"
const stringWithSpaces = "Hello World 123";
const stringWithoutSpaces = stringWithSpaces.split(" ").join("");
console.log(stringWithoutSpaces); // Output: "HelloWorld123"
const stringWithSpaces = "Hello World 123";
const stringWithoutSpaces = stringWithSpaces.replaceAll(" ", "");
console.log(stringWithoutSpaces); // Output: "HelloWorld123"
function removeSpaces(input: string): string {
    return input.replace(/\s/g, "");
}

// Usage
const originalString = "This is a test string";
const result = removeSpaces(originalString);
console.log(result); // Output: "Thisisateststring"
